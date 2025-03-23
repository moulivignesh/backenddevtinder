const express=require("express");
const {ConnectDB}=require("./Configuration/DBconnect");
const {User}= require("./model/User");
const {ValidateSingnupdata,validationemail}=require("./Utils.js/Validation");
// const {bcrypt}= require("bcrypt");
const bcrypt = require("bcryptjs");
const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken');
const {AuthToken}=require("../src/Middlewares/Authen");

const app= express();

app.use(express.json());
app.use(cookieParser());


// app.get("/feed",async (req,res)=>{
//     try{
//         const reqbody={};
//         const user=await User.find(reqbody);
//            res.send(user);
//     }
//     catch(err){
//         res.send("error");
//     }
   
//    });

//    app.patch("/UserUpdate/:id", async (req,res)=>{
//         try{
//             const id = req.params.id;
//             const data=req.body;
//             const allowedItems = ["firstName", "emailId", "password","skills", "lastName","photoURL"];
//             const isAllowedItems = Object.keys(data).every((key) => allowedItems.includes(key));
//             console.log(isAllowedItems);
//              if (!isAllowedItems) {
                
//                 throw new Error("Inavalid key so kindly check the key");
//               }
//               if (data.skills.length > 10) {
                
//                 throw new Error("Skills cannot be more than 10");
//               }
            


//             // const data=req.body.emailId;
            
//            const userupdate= await User.findByIdAndUpdate(id,data,{new: true,runValidators:true});
//            res.send("user is updated");


//         }catch (err) {
            
//             res.status(400).send(err.message || "User data is not valid");
//           }
//    })

//    app.delete("/DeleteUser", async (req,res)=>{
//     const idname=req.body;
//     try{
//        const userupdate= await User.findByIdAndDelete(idname);
//        res.send("user is deleted");


//     }catch(err){
//        res.status(400).send("error");
//     }
// })


// app.get("/feed",async(req,res)=>{

//     const user=req.body.emailId;
    
//     try
//     {
        
//       const userdata=await User.find({emailId:user});
//       if(userdata.length===0){
        
//           res.status(500).send("user not found")
//       }else{
//         res.send(userdata);
//       }
      
        
//     }catch(err){
//         res.status(404).send("User is not fond");
//     }

// })

app.post("/signup",async(req,res)=>{
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

app.post("/SendConnectionRequest",AuthToken, async(req,res)=>{
    const user=req.userprofile;
    console.log("connection request sent");
    res.send(user.firstName +"connection request sent");

})

app.post("/login",async (req,res)=>{
    const {emailId,password}=req.body;
    try{
        
         console.log(validationemail(emailId));
         const IsemailPresentInDbgetuser= await User.findOne({emailId});
        
         if(!IsemailPresentInDbgetuser){
            throw new Error("user is not availabe in our DB");
         }
         const IspasswordValid=await bcrypt.compare(password, IsemailPresentInDbgetuser.password);
         if(IspasswordValid){
            //Creating the JSON WEB TOKEN(JWT)
            const token = jwt.sign({_id:IsemailPresentInDbgetuser.id}, 'Mouli@123');
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

app.get("/profile", AuthToken,async (req,res)=>{

    try{ 

        const userprofile =req.userprofile;

         res.send(userprofile);
      }
    catch(err)
    {
        res.status(400).send(err.message || "invalid crendials for logined use please login again");
    }


});


ConnectDB().then(()=>{
    console.log("db connect is successfully completed");
    app.listen(3000,()=>{
        console.log("port is listening successfully")
    });
}).catch((err)=>{
        {
            console.log("db is not valid")
        }
    })


   

