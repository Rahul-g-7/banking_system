const transactionModel=require('../models/transaction.model')
const accountModel=require('../models/account.model')
const ledgerModel=require('../models/ledger.model')
const emailService=require('../services/email.service')
async function transferAmountController(req,res){
    const {fromAccount,idempotencyKey,toAccount,amount}=req.body
    if(!fromAccount||!toAccount||!amount||!idempotencyKey){
        return res.status(400).json({
            message:"Fields are required"
        })
    }

    
    
}

module.exports={transferAmountController}   