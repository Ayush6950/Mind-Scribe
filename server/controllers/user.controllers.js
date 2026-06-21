import UserModel from "../models/User.js";

export const getCurrentUser = async (req,res,) =>  {
    try{
        const userId = req.userId
        const user = await  UserModel.findById(userId)
        if(!user){
            return res.status(404).json({message:"Current User is not found"})
        }
        
        // Auto top-up credits to 50 if they fall below 10 (for development/testing convenience)
        if (user.credits < 10) {
            user.credits = 50;
            user.isCreditAvailable = true;
            await user.save();
        }

        return res.status(200).json(user)
        }catch(error){
            return res.status(500).json({message:`getCurrentUser error  ${error}`})
        }
}
