const express=require("express");
const {ConnectDB}=require("./Configuration/DBconnect");
const AuthRouter=require("../src/Routers/Auth");
const ProfileRouter=require("../src/Routers/Profile");
const RequestRouter=require("../src/Routers/request");



// const {bcrypt}= require("bcrypt");

const cookieParser = require("cookie-parser");


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


app.use("/",AuthRouter);

app.use("/",ProfileRouter);

app.use("/",RequestRouter);



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


   

