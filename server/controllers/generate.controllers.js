import UserModel from "../models/User.js";
import Notes from "../models/notesModel.js";

import { generateNotesPrompt } 
from "../utils/promptBuilder.js";

import { generateGeminiResponse } 
from "../services/gemini.service.js";

export const generateNotes = async(req,res)=>{
    try{
        const {
            topic,
            level,
            exam,
            revisionMode,
            includeDiagram,
            includeCharts
        } = req.body;
    
        if(!topic){
            return res.status(400).json({
                message:"Topic is required"
            });
        }
        // Find user
        const user = await UserModel.findById(req.userId);
        if(!user){
            return res.status(404).json({
                message:"User not found"
            });
        }

        if(user.credits < 10){
            user.isCreditAvailable = false;
            await user.save();
            return res.status(403).json({
                message:"Insufficient credits"
            });
        }

        // Create AI prompt
        const prompt = generateNotesPrompt({
            topic,
            level,
            exam,
            revisionMode,
            includeDiagram,
            includeCharts

        });
        // Call Gemini
        const aiResponse =
        await generateGeminiResponse(prompt);
        // Save notes

        const notes = await Notes.create({

            user:user._id,
            topic,
            level,
            exam,
            revisionMode,
            includeDiagram,
            includeCharts,
            content:aiResponse
        });
        // Reduce credits
        user.credits -= 10;
        if(user.credits <= 0){
            user.isCreditAvailable = false;
        }
        if(!Array.isArray(user.notes)){

            user.notes=[];

        }

        user.notes.push(notes._id);
        await user.save();
        return res.status(200).json({
            success:true,
            message:"Notes generated successfully",
            data:aiResponse,
            noteId:notes._id,
            creditsLeft:user.credits
        });
    }
    catch(error){
        console.error(
            "Generate Notes Error:",
            error.message
        );
        return res.status(500).json({
            success:false,
            message:"AI generation failed"
        });
    }
};