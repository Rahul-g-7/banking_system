const transactionModel=require('../models/transaction.model')
const accountModel=require('../models/account.model')
const ledgerModel=require('../models/ledger.model')
const emailService=require('../services/email.service')

async function createTransaction(req,res){
    const {fromAccount,idempotencyKey,toAccount,amount}=req.body
    if(!fromAccount||!toAccount||!amount||!idempotencyKey){
        return res.status(400).json({
            message:"FromAccount, toAccount, amount and idempotencyKey are required"
        })
    }
    const fromUserAccount= await accountModel.findOne({
        _id:fromAccount
    })
    const toUserAccount= await accountModel.findOne({
        _id:toAccount
    })    
    if(!fromUserAccount||!toUserAccount){
        return res.status(404).json({
            message:"Invalid fromAccount or toAccount"
        })
    }
}


module.exports={createTransaction} 