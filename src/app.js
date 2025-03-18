const express=require("express");
 
const app= express();

const {adminauth,userauth}=require("./Middlewares/Authen");


//Write a dummy middleware for auth 

app.use("/admin",adminauth);

app.post("/user/login",(req,res)=>{
    res.send("user login successfull");
});

app.get("/user/usedata",userauth,(req,res)=>{
    res.send("user data is sent successfuy");
});




app.get("/admin/GetAllData",(req,res)=>{
    console.log('data sent successfully');
    res.send("ALL Data is received sucessfully");
});

app.get("/admin/getonedata",(req,res)=>{
    res.send("getonedata sendsuccessfully");
});


app.listen(3000,()=>{
    console.log("port is listening successfully")
});