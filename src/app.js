const express=require("express");
 
const app= express();

const {adminauth,userauth}=require("./Middlewares/Authen");


//Write a dummy middleware for auth 
    app.use("/user",(req,res,next)=>{
        

        try{
            throw new Error("Something went wrong");
            res.send("cde is good");
        }catch(err){
            res.status(500).send("you have error kindly check");
        }
        
    });





//app.use is oneway of handling the error. best way is always try catch only 
// app.use("/",(err,req,res,next)=>{
   

//     res.status(500).send("you have error kindly check");
// })



app.listen(3000,()=>{
    console.log("port is listening successfully")
});