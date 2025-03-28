const { timeStamp } = require("console");
const mongoose=require("mongoose");
const { type } = require("os");
const validator = require("validator");
const jwt=require("jsonwebtoken");
const bcrypt = require("bcryptjs");

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
     minlength: 5,
     required:true,
     unique:true,
     validate(value){
       if(!validator.isEmail(value)) {
        console.log("invalid email");
        throw new Error("invalid email");
       }
     }
     

    },
    password:{
    type: String,
    trim: true,
     minLength: 5,
     required:true,
     unique:true,
     validate(value){
        if(!validator.isStrongPassword(value)) {
         
         throw new Error("invalid password");
        }
      }
    },
    gender:{
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
        validate(value){
            if(!validator.isURL(value)) {
             
             throw new Error("photo url inavlid");
            }
          }

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

userSchema.methods.getJWT=async function(){
    const user=this;
    
    const token = await jwt.sign({_id:user._id}, 'Mouli@123',{ expiresIn: '1h' });
    return token;
}

userSchema.methods.ValidatePassword=async function(passwordInputbyuser){
    const user=this;//here this describes the instance of that one single user in db eg:-- test 1 user
    const passwaordHash=user.password;
   const IspasswordValid= await bcrypt.compare(passwordInputbyuser, passwaordHash);
   return IspasswordValid;
}
const User = mongoose.model("User",userSchema);

module.exports={User}