import jwt from "jsonwebtoken";

<<<<<<< HEAD
export const generateToken = async (userId) => {
     try {
     const token = jwt.sign({userId},process.env.JWT_SECRET , {expiresIn:"7d"})
     console.log(token)
     return token;
     } catch(error){
    console.log(error);
    };
};
=======
export const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
>>>>>>> 61191870a453af68a99983cd3a0b5f2f1c547eb8
