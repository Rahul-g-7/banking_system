const mongoose=require('mongoose')

const ledgerSchema=new mongoose.Schema({
    account:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"Ledger must be associated with a user"],
        index:true,
        immutable:true
    },
    amount:{
        type:Number,
        required:[true,"Amount is required"],
        immutable:true
    },
    type:{
        type:String,
        enum:{
            values:["DEBIT","CREDIT"],
            message:"Type can only be DEBIT or CREDIT"
        },
        required:[true,"Type is required"],
        immutable:true
    }
})
function preventLegderModification(){

    throw new Error("Ledger cannot be modified after creation")
}
ledgerSchema.pre("deleteMany",preventLegderModification)
ledgerSchema.pre("updateOne",preventLegderModification)
ledgerSchema.pre("findOneAndUpdate",preventLegderModification)
ledgerSchema.pre("findByIdAndUpdate",preventLegderModification)
ledgerSchema.pre("remove",preventLegderModification)
ledgerSchema.pre("deleteOne",preventLegderModification)
ledgerSchema.pre("findOneAndDelete",preventLegderModification)
ledgerSchema.pre("findOneAndReplace",preventLegderModification)
ledgerSchema.pre("updateMany",preventLegderModification)


const ledgerModel=mongoose.model("ledger",ledgerSchema)
module.exports=ledgerModel