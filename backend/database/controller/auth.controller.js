import bcryptjs from "bcryptjs";
import User from "../../models/user.model.js";
import generateVerificationCode from "../../utils/generateVerificationCode.js";
import generateTokenAndSetCookies from "../../utils/generateTokenAndSetCookies.js";
import {
  generateUserVerificationEmail,
  generateUserWelcomeEmail,
  passwordRequestSucessEmail,
  passwordResetRequest,
} from "../../mailtrap/email.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE } from "../../mailtrap/mailTemplete.js";
import crypto from "crypto";




//for SignUP
export const signup = async (req, res) => {
  const { email, name, password } = req.body; //get all the data from the body{email,name,password} i.e req.body
  const hashPassword = await bcryptjs.hash(password, 10); //hashing the password so that it is not stored in plain text
  const verificationToken = generateVerificationCode(); // a verification code is generate to send to the user email for verification
  const userAlreadyExist = await User.findOne({ email: email }); //true if the user already exist in the database

  try {
    if (!email || !name || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (userAlreadyExist) {
      return res
        .status(400)
        .json({ message: "User with this email already exist" });
    }

    //create a new user with all the data received from body with hashed password nad verification token with expiry time
    const user = new User({
      email,
      name,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 20 * 60 * 1000,
      password: hashPassword,
    });
    // saving the data to database
    await user.save();

    // creating jwt and saving it in cookies
    generateTokenAndSetCookies(res, user._id);

    await generateUserVerificationEmail(user.email, verificationToken);
    
    // responsing with a message
    res.status(201).json({
      user: {
        ...user._doc,
        password: undefined
      },
      success:true,
      message: "User created successfully" });
  } catch (error) {
    console.log("The error of auth controller is: ", error);
  }
};



//for Signin
export const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }
    if (email != user.email) {
      return res.status(400).json({ message: "email not correct" });
    }

    const isPasswordChecked = await bcryptjs.compare(
      password.toString(),
      user.password
    );
    if (!isPasswordChecked) {
      return res.status(400).json({ message: "Credential is Wrong" });
    }

    generateTokenAndSetCookies(res, user._id);
    user.lastlogin = new Date();

    await user.save();

    res.status(200).json({
      success: true,
      message: "sucessefully loggedIn",
      user: {
        ...user._doc,
        password: undefined,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }
};



//for verification through email
export const verifyEmail = async (req, res) => {
  const { token } = req.body;
  if (!token) {
    return res.status(400).json({ message: "Invalid token" });
  }
  if (token) {
    try {
      const user = await User.findOne({
        verificationToken: token,
        verificationTokenExpiresAt: { $gt: Date.now() },
      });
      if (!user) {
        return res
          .status(400)
          .json({ message: "Invalid token or token expired" });
      }

      user.isverified = true;
      user.verificationToken = undefined;
      user.verificationTokenExpiresAt = undefined;
      await user.save();
      await generateUserWelcomeEmail(user.name, user.email);
      res.status(200).json({
        success: true,
        message: "Email verified successfully",
        user: {
          ...user._doc,
          password: undefined,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }
};



export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};




//for forgot Password
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const resetToken = crypto.randomBytes(20).toString("hex");
  const resetURL = `${process.env.LOCAL_ENDPOINT}/reset-password/${resetToken}`;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User Not found" });
    }

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = Date.now() + 1 * 60 * 60 * 1000;
    await user.save();

    await passwordResetRequest(user.email, resetURL);
    res.status(200).json({ message: "Succesfully done" });
  } catch (error) {
    console.log(error); 
    res
      .status(400)
      .json({ message: `Error occured at forgot password with ${error}` });
  }
};




export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    console.log(token,password)

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      res.status(400).json({ message: "Token is not valid" });
    }
    
    const hashedPassword= await bcryptjs.hash(password,10);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;
    user.password = hashedPassword;

    await user.save();
    await passwordRequestSucessEmail(user.email);


    res.status(200).json({message:"Successfully password reset"})
  } catch (error) {
    console.log("the error is",error);
  }
};




export const checkAuth = async(req,res)=>{
try{
  const user= await User.findById(req.userId)
if(!user) return  res.status(400).json({success:false,message:"user not found"})
  res.status(200).json({success:true,user:{
...user._doc,
password:undefined}})
}catch(error){
  console.log(error)
  return res.status(400).json({status:false,message:"couldnot get auth"})
}

};



