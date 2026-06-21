import jwt from "jsonwebtoken";
import fs from "fs";

const isAuth = async (req,res,next) => {
    try{
        let {token} = req.cookies
        if(!token){
           return res.status(400).json({message:"Token is not found"})
        }
        let verifyToken = jwt.verify(token,process.env.JWT_SECRET)
        if(!verifyToken){
            return res.status(400).json({message:"user doe't  have valid token "})
        }
        
        req.userId = verifyToken.userId
        next()
        
     } catch(error){
        try {
            fs.appendFileSync(
                "temp_error.log",
                `[${new Date().toISOString()}] isAuth Error:\n${error.stack || error}\n\n`
            );
        } catch (e) {
            console.error("Failed to write to temp_error.log:", e);
        }
        return res.status(500).json({message:`is auth error ${error}`})
     }
}

export default isAuth;