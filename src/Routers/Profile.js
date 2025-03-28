const express = require("express");
const ProfileRouter=express.Router();
const {AuthToken}=require("../Middlewares/Authen");
const {ValidateEditprofile}= require("../Utils.js/Validation");
const bcrypt = require("bcryptjs");


ProfileRouter.get("/profile/veiw", AuthToken,async (req,res)=>{

    try{ 

        const userprofile =req.userprofile;

         res.send(userprofile);
      }
    catch(err)
    {
        res.status(400).send(err.message || "invalid crendials for logined use please login again");
    }


});

ProfileRouter.patch("/profile/edit",AuthToken,async(req,res)=>{
    //Data validation is importtant because new dat is comming in to the database.

     try{
        if(!ValidateEditprofile(req)){

            throw new Error("your profile data which you send is not editable, kindly check the keys");
            
        }
        console.log("validation");
        const user=req.userprofile;//this is getting from the middle ware authToken
        
        Object.keys(req.body).forEach((key)=>(user[key]=req.body[key]));
        
        await user.save();
        

        res.json({
            message: `${user.firstName}, you are successfully updated`,
            data: user,
        });
        
    }
    catch(err)
    {
        res.status(400).json({ error: err.message || "User is unable to edit data" });
    }

});

ProfileRouter.patch("/profile/password",AuthToken,async(req,res)=>{

    try{
        // const newPassword= req.body.password;
        
        // const userPasswordinDB=user.password;
        const user=req.userprofile;
    
        user.password=req.body.password;
    
        // cnsole.log(userPasswordinDB);
        console.log(user.password);
    
        const passwordHash=await bcrypt.hash(user.password,10);
    
        console.log(passwordHash);
    
        if(!passwordHash){
            throw new Error("Passwordhash failed");
        }
    
        user.password = passwordHash; // Assign hashed password
        await user.save(); // Save the updated document
        
        res.send("password updated");
    }
    catch(err)
    {
        res.status(400).json({ error: err.message || "User is unable to edit data" });
    }

    
}
);


module.exports=ProfileRouter;