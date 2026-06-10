import jwt from 'jsonwebtoken';

export const generateToken = async (userId) => {
     try {
     const token = jwt.sign({userId},process.env.JWT_SECRET , {expiresIn:"7d"})
     console.log(token)
     return token;
     } catch(error){
    console.log(error);
    };
};