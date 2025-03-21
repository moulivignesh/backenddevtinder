const { timeStamp } = require("console");
const mongoose=require("mongoose");
const { type } = require("os");

const userSchema=mongoose.Schema({
    firstName : {
     type: String,
     trim: true,
     minLength: 2,
     MaxLength:20,
     required:true,

    },
    lastName :{
        type: String
    },
    emailId :{
    type: String,
     trim: true,
     minLength: 5,
     required:true,
     unique:true,

    },
    password:{
    type: String,
    trim: true,
     minLength: 5,
     required:true,
     unique:true,
    },
    age:{
        type: String,
        validate(value){
            if(!["male","Female","others"].includes(value)){
                throw new Error("gender is not a valid gender");
            }
        }
    },
    photoURL:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.k9vGN2Z7PEx31AlrMRPkYAHaHd?pid=ImgDet&w=182&h=183&c=7",

    },
    about:{
        type:String,
        default:"This a dfault abunt the user",
    },
    skills:{
        type : [String],
    },
    creatAt:{
        type : Date
    }
    
},{
    timeStamp:true,
});

const User = mongoose.model("User",userSchema);

module.exports={User}