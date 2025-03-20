const express=require("express");
const {ConnectDB}=require("./Configuration/DBconnect");
const {User}= require("./model/User");
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
    //how to post the data(logic we need to write here)
    const UserInstance=new User(req.body);
    try{
        await UserInstance.save();
        res.send("User is saved successfully");
    }catch(err){
     res.status(500).send("Error meaaseage");
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


   

