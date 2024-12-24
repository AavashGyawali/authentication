import jwt from 'jsonwebtoken';

const generateTokenAndSetCookies = (res, userId) => {
    //jwt token created with user id from database as veriication and jwt secret_key stored in .env file
    const token =jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"7d"});

    //saving jwt in cookies with extra security options
    res.cookie("token",token,{
        httpOnly:true, //to prevent xss attack
        maxAge:7*24*60*60*1000,  // 7 days
        secure:process.env.NODE_ENV === "production" ? true : false,
        sameSite:"strict", //to prevent csrf attack
    })
    //returning the token to use in other places for authorization
    return token;
}

export default generateTokenAndSetCookies;