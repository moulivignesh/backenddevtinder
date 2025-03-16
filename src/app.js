const express=require("express");
 
const app= express();

app.use("/home",(req,res)=>{
    res.send("home");
});

app.use("/test",(req,res)=>{
    res.send("test");
});

app.use("/hello",(req,res)=>{
    res.send("hello");
});

app.use("/hellomoul",(req,res)=>{
    res.send("hellomouli");
});



app.listen(3000,()=>{
    console.log("port is listening successfully")
});