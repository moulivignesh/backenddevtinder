const mongoose = require("mongoose");

const connectionRequestSchema= mongoose.Schema({

    fromUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    toUserId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    status:{
        type: String,
        enum:{
            values:["ignored","interested","accepted","rejected"],
            message:'{VALUE} is incorrect'
        },
        required:true

    }
},{
 timeStamp:true,
});

connectionRequestSchema.index(
    { fromUserId: 1, toUserId: -1 }
)
connectionRequestSchema.pre("save",function(next){
    const connectionRequest=this;
    //check if the from user id ==touserid
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
   throw new Error("cannot send re to ur id")
    }
    next();
})


const ConnectionRequest= mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports=ConnectionRequest;
