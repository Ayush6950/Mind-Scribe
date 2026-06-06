import User from "../models/User.js";
import { generateToken } from "../utils/token.js";

export const googleAuth = async (req, res) => {
  try {
    const { name, email } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      user,
      token,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: `Google Signup Error: ${error.message}`,
    });
  }
};


export const Authlogout = async(req,res) => {
  try { 
    await res.clearCookie("token")
      return res.status(200).json({message:"logout Sucessfully"});
  } catch (error) {
     return res.status(500).json({message:`logout|error ${error}`});
  }
}