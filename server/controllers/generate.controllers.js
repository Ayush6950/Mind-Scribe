import UserModel from "../models/User.js"



export const generateNotes = async (req, res) => {
    try {
        const {
            topic,
            level,
            exam,
            revisionMode,
            includeDiagram,
            includeCharts
        } = req.body()
        if (!topic){
            return res.status(400).json({message:"topic is required"})
        }
        
        const user  =
        

    } catch (error)

}