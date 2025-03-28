const express=require("express");
const AuthRouter=express.Router();
const bcrypt = require("bcryptjs");
const {ValidateSingnupdata,validationemail}=require("../Utils.js/Validation");
const {User}= require("../model/User");




AuthRouter.post("/signup",async(req,res)=>{
    //Validate the user who is registering
    //password hashing
    //Create a User instance and save it
   
    const {firstName,lastName,emailId,password}=req.body;
   const passwordHash=await bcrypt.hash(password, 10);
   

    
    const UserInstance=new User(
        {firstName,
        lastName,
        emailId,
        password: passwordHash});

    try{
        ValidateSingnupdata(req);
        await UserInstance.save();
        res.send("User is saved successfully");
    }catch(err){
        res.status(400).send(err.message || "User data is not valid");
    }

    
    
});


AuthRouter.post("/login",async (req,res)=>{
    const {emailId,password}=req.body;
    try{
        
        //  console.log(validationemail(emailId));
         const IsemailPresentInDbgetuser= await User.findOne({emailId});
        
         if(!IsemailPresentInDbgetuser){
            throw new Error("user is not availabe in our DB");
         }
         const IspasswordValid=await IsemailPresentInDbgetuser.ValidatePassword(password);
         if(IspasswordValid){
            //Creating the JSON WEB TOKEN(JWT) get jwt is method present in model User
            const token=await IsemailPresentInDbgetuser.getJWT();
            //add token to cookie and send it to browseer
            res.cookie("token",token);
           res.send("user logged in");
         }else{
            throw new Error("pls check the assword");
         }
    }
    catch(err){
        res.status(400).send(err.message || "invalid crendials");
    }

});

AuthRouter.post("/logout",async(req,res)=>{
    res.cookie("token",null,{ expires: new Date(Date.now() + 900000), httpOnly: true });
    res.send("logged out successfull");
   
});


module.exports=AuthRouter;
