const mongoose= require("mongoose");

const ConnectDB= async()=>{
    await mongoose.connect("mongodb+srv://moulivignesh1996:mouli@cluster0.h5zku.mongodb.net/devtinderapps?retryWrites=true&w=majority");

}

module.exports ={ConnectDB}