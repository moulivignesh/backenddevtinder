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
   
   });

   app.patch("/UserUpdate/:id", async (req,res)=>{
        try{
            const id = req.params.id;
            const data=req.body;
            const allowedItems = ["firstName", "emailId", "password","skills", "lastName"];
            const isAllowedItems = Object.keys(data).every((key) => allowedItems.includes(key));
            console.log(isAllowedItems);
            if (!isAllowedItems) {
                console.log("IF block triggered – invalid key(s) found");
                throw new Error("Invalid keys found in request body");
              }
              if(data.skills.length >10){
                console.log("skilly cannot be more than 10");
                throw new Error("skilly cannot be more than 10");
              }
            


            // const data=req.body.emailId;
            
           const userupdate= await User.findByIdAndUpdate(id,data,{new: true,runValidators:true});
           res.send("user is updated");


        }catch(err){
            res.status(400).send("eror user data is not valid check the nmae or email id");
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
    //how to post the data(logic we need to write here)
    const UserInstance=new User(req.body);
    try{
        await UserInstance.save();
        res.send("User is saved successfully");
    }catch(err){
     res.status(500).send("Details are not update or Api not hiting the database");
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


   

