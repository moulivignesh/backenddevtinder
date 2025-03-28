//there 3 ways of validation we can do--> we do write our own logic to validate the use inputs.ex: firstname validation & we can do use validator function(using validatr).(Api level validation)
// we can validate the input in DB level validation.
const validator = require("validator");


const ValidateSingnupdata=(req)=>{
    const {firstName,lastName,emailId,password}=req.body;
    if(!firstName || !lastName){
        throw new Error("First and last Is required");
    }
    else if (firstName.length < 4 || firstName.length > 50)
    {
        throw new Error("First name should be between 4 and 50 characters");
    } 
    else if(!validator.isEmail(emailId))
    {
        throw new Error("Email is not valid");

    }
    else if(!validator.isStrongPassword(password))
    {
        throw new Error("Password must be strong");
    }

}

const ValidateEditprofile=(req)=>{
    const allowedfields =["firstName","lastName","skills","age","photoURL"];

   const IsValidfileds= Object.keys(req.body).every((key)=>allowedfields.includes(key));//return true or false

   return IsValidfileds;
}

const validationemail=(emailId)=>{

    if(!validator.isEmail(emailId)){
        throw new Error("login Email is not valid");
    }

}
module.exports =
{
    ValidateSingnupdata,
    validationemail,
    ValidateEditprofile
}