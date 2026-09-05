const mongoose = require('mongoose');

const connectDB=()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then(()=>{
        console.log("connected to MongoDB");     
    })
    .catch((err)=>{
        console.log("Error connecting to MongoDB",err);
    })
}
module.exports=connectDB;