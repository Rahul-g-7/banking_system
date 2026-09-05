const mongoose=require("mongoose")


const transactionSchema=new mongoose.Schema({
    fromAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Transaction must be associated with a from account"],
        index:true
    },
    toAccount:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Transaction must be associated with a to account"],
        index:true
    },
    amount:{
        type:Number,
        required:[true,"Transaction amount is required"],
        min:[0, "Amount must be greater than 0"]
    },
    idempotencyKey:{
        type:String,
        required:[true,"Idempotency key is required"],
        unique:true,
        index:true
    },
    status:{
        type:String,
        enum:{
            values:["PENDING","COMPLETE","FAILED","REVERSED"],
            message:"Status can only be PENDING, COMPLETE, FAILED or REVERSED",
        },
        default:"PENDING"
    },
},{
    timestamps:true
})

const transactionModel=mongoose.model("transaction",transactionSchema)
module.exports=transactionModel
