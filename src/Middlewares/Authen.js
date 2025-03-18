const adminauth=(req,res,next)=>{
    const token="xyz";
    const IsAunthen = token==="xyz";
    if(!IsAunthen){
        res.status(401).send("Not a valid authen");
    }
    else{
        next();
    }
    }

    const userauth=(req,res,next)=>{
        const token="xyoz";
        const IsAunthen = token==="xyz";
        if(!IsAunthen){
            res.status(401).send("Not a valid user");
        }
        else{
            next();
        }
        }
     module.exports ={
        adminauth,
        userauth
     }