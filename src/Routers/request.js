const express=require("express");
const RequestRouter=express.Router();
const {AuthToken}=require("../Middlewares/Authen");
const ConnectionRequest=require("../model/ConnectionRequest");






RequestRouter.post("/request/send/:status/:userid",AuthToken, async(req,res)=>{
    

    try{

        const fromUserId=req.userprofile._id;
    const toUserId=req.params.userid;
    const status=req.params.status;

        const AllowedStatus=["ignored","interested"];

    if(!(AllowedStatus.includes(status))){
        throw new Error("You status is not defined kindly check");
    }
   

    if(!toUserId){
        return res.status(400).send(err.message || "user not in db or user is misatched");
    }
   

    const existingConnection= await ConnectionRequest.findOne({ 
        $or: [{fromUserId,toUserId},
              {fromUserId:toUserId,toUserId:fromUserId}],
  });
 
   
  if(existingConnection){
   return res.status(400).send(existingConnection.message || "existing connection1");
  }
    const ConnectionRequestInstance=new ConnectionRequest(
            {fromUserId,
            toUserId,
            status,
           });
           
   
    await ConnectionRequestInstance.save();
 res.send("connection request sent");
    } 
    
    catch(err)
    {
        res.status(400).send( err.message ||"invalid connection");
    }

    

});

RequestRouter.post("/request/receive/:status/:requestid",AuthToken,async(req,res)=>{

    try{

        //Satus check --> allowed fields in status
        //if accept or reject user must be logged in
        //always user shoud touserid

        const Loggedinid = req.userprofile;  // Get logged-in user
        const {status,requestid}=req.params;

        const allowedfields=["accepted","rejected"];

        if(!(allowedfields.includes(status))){
            return res.status(400).json({
                message:"check the status nce t alows only accept or recect",
               
            })
        }
      
        const connectionRequest= await ConnectionRequest.findOne({
            _id: requestid,
            toUserId: Loggedinid._id,
            status:"interested"
        });
        if(!connectionRequest){
         
            return res.status(400).send("ConnectionRequestFind is not finadable");
           }
           connectionRequest.status=status;
        await connectionRequest.save();
        res.json("connecton request"+status);
        
    }
    catch(err){
        res.status(400).json("it not valid code kindly check")
    }

});
module.exports=RequestRouter;