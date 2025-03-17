const express=require("express");
 
const app= express();

app.get("/user",(req,res)=>{
    res.send({
        firstname:"mouli",
        Lastname: "Vignesh"
    })
});

app.delete("/user",(req,res)=>{
    res.send("User is deleted successfully");
});

app.patch("/user",(req,res)=>{
    res.send("User feild is updated successfully");
});

app.post("/user",(req,res)=>{
   res.send("User data is saved successfullyy")
});

app.use("/user",(req,res)=>{
    res.send("home");
});

app.listen(3000,()=>{
    console.log("port is listening successfully")
});