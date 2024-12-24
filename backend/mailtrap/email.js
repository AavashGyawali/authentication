import { mailTrapClient,sender } from "../mailtrap/mailtrap.config.js";
import { VERIFICATION_EMAIL_TEMPLATE,WELCOME_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE,PASSWORD_RESET_SUCCESS_TEMPLATE } from "./mailTemplete.js";

export const generateUserVerificationEmail=async(email,verificationToken)=>{
    const recepients = [{email}];
    try{
  await  mailTrapClient.send({
        from: sender,
        to: recepients,
        subject: "Verification Email",
        html:VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}",verificationToken),
        category: "Verification Email",
    })}
    catch(err){
        console.log(err);
    }
}


export const generateUserWelcomeEmail=async(name,email)=>{

    const recepients = [{email}];
    try{
  await  mailTrapClient.send({
        from: sender,
        to: recepients,
        subject: "Welcome To Aavash Auth",
        html:WELCOME_EMAIL_TEMPLATE.replace("{username}",name),
        category: "Welcome Email",
    })}
    catch(err){
        console.log(err);
    }


}

export const passwordResetRequest = async(email,url)=>{
   const recepients=[{email}]

    try{
        await mailTrapClient.send({
            from:sender,
            to:recepients,
            subject:"Reset Your Password",
            html:PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}",url),
            category:"Forgot Email"
        })
    }
    catch(error){
        console.log("the error from passwordResetRequest is ",error)
    }
}



export const passwordRequestSucessEmail = async(email)=>{
    const recepients =[{email}]
    try{
        await mailTrapClient.send({
            from:sender,
            to:recepients,
            subject:"Password Reset Successfully",
            html:PASSWORD_RESET_SUCCESS_TEMPLATE,
            category:"Reset Successful"
        })
    }
    catch(error){
        console.log(error);
    }
}


