const cookieParser = require("cookie-parser");
const {User}= require("../model/User");
const jwt=require("jsonwebtoken");

const AuthToken=async (req,res,next)=>{
   try{
    const {token}=req.cookies;
    if(!token){
        throw new Error("Token is expired");
    }
    const decoded= await (jwt.verify(token,"Mouli@123",{ expiresIn: '1h' }));

    const {_id}=decoded;

    
    const userprofile=await User.findById(_id);//return true or false
    if(!userprofile){
        throw new Error("User profile is not found r please logn again");
    }
    req.userprofile=userprofile;
    next();
   }

   catch(err){
    res.status(400).send(err.message || "authentication failed");
   }

}
 module.exports={
    AuthToken
}