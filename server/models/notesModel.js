import mongoose from "mongoose";


const notesSchema = new mongoose.Schema(

    {

        // Owner of notes
        user:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },


        // Main topic
        topic:{
            type:String,
            required:true,
            trim:true
        },


        // Student level
        level:{
            type:String,
            default:"Beginner"
        },


        // Exam type
        exam:{
            type:String,
            required:true,
            trim:true
        },


        // AI generated notes
        content:{
            type:String,
            required:true
        },


        // AI generation settings
        settings:{

            revisionMode:{
                type:Boolean,
                default:false
            },


            includeDiagram:{
                type:Boolean,
                default:false
            },


            includeCharts:{
                type:Boolean,
                default:false
            }

        },


        // Optional tags
        tags:[
            {
                type:String
            }
        ],


        // Track AI model
        aiModel:{
            type:String,
            default:"gemini-flash"
        },


        // Favourite notes
        isFavorite:{
            type:Boolean,
            default:false
        },


        // Soft delete
        isDeleted:{
            type:Boolean,
            default:false
        }


    },

    {
        timestamps:true
    }

);



const Notes = mongoose.model("Notes", notesSchema);

export default Notes;