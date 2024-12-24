import jwt from "jsonwebtoken";


const verifyToken = (req,res,next) => {
  const token =req.cookies.token
  if(!token) return res.status(401).json({success:false, message:"unauthorized token"})

  try{
    const decoded =jwt.verify(token,process.env.JWT_SECRET)   
    if(!decoded)return res.status(401).json({success:false,message:"invalide token"})
    req.userId= decoded.userId;
       next()

  }
  catch(error){
    console.log(error)
    return res.status.json({success:false,message:"server error"})
  }
}

export default verifyToken