const express=require("express");
const {ConnectDB}=require("./Configuration/DBconnect");
const {User}= require("./model/User");
const {ValidateSingnupdata,validationemail}=require("./Utils.js/Validation");
// const {bcrypt}= require("bcrypt");
const bcrypt = require("bcryptjs");

const app= express();

app.use(express.json());


app.get("/feed",async (req,res)=>{
    try{
        const reqbody={};
        const user=await User.find(reqbody);
           res.send(user);
    }
    catch(err){
        res.send("error");
    }
   
   });

   app.patch("/UserUpdate/:id", async (req,res)=>{
        try{
            const id = req.params.id;
            const data=req.body;
            const allowedItems = ["firstName", "emailId", "password","skills", "lastName","photoURL"];
            const isAllowedItems = Object.keys(data).every((key) => allowedItems.includes(key));
            console.log(isAllowedItems);
             if (!isAllowedItems) {
                
                throw new Error("Inavalid key so kindly check the key");
              }
              if (data.skills.length > 10) {
                
                throw new Error("Skills cannot be more than 10");
              }
            


            // const data=req.body.emailId;
            
           const userupdate= await User.findByIdAndUpdate(id,data,{new: true,runValidators:true});
           res.send("user is updated");


        }catch (err) {
            
            res.status(400).send(err.message || "User data is not valid");
          }
   })

   app.delete("/DeleteUser", async (req,res)=>{
    const idname=req.body;
    try{
       const userupdate= await User.findByIdAndDelete(idname);
       res.send("user is deleted");


    }catch(err){
       res.status(400).send("error");
    }
})


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
   console.log(passwordHash);

    
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
           res.send("user logged in");
         }else{
            throw new Error("pls check the assword");
         }
    }
    catch(err){
        res.status(400).send(err.message || "invalid crendials");
    }

})


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


   

