const transactionModel=require('../models/transaction.model')
const accountModel=require('../models/account.model')
const ledgerModel=require('../models/ledger.model')
const emailService=require('../services/email.service')
/**
 * - Create a new transaction
 * THE 10-STEP TRANSFER FLOW:
     * 1. Validate request
     * 2. Validate idempotency key
     * 3. Check account status
     * 4. Derive sender balance from ledger
     * 5. Create transaction (PENDING)
     * 6. Create DEBIT ledger entry
     * 7. Create CREDIT ledger entry
     * 8. Mark transaction COMPLETED
     * 9. Commit MongoDB session
     * 10. Send email notification
 */

async function createTransaction(req,res){
    //1. Validate request
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
    //2.Validate idempotency key
    const isTransactionAlreadyExistes=await transactionModel.findOne({
        idempotencyKey: idempotencyKey
    })
    if(isTransactionAlreadyExistes){
        if(isTransactionAlreadyExistes.status==="COMPLETE"){
            return res.status(400).json({
                message:"Transaction already completed"
            })
        }
        if(isTransactionAlreadyExistes.status==="PENDING"){
            return res.status(400).json({
                message:"Transaction already pending"
            })
        }
        if(isTransactionAlreadyExistes.status==="FAILED"){
            return res.status(400).json({
                message:"Transaction already failed"
            })
        }  
        if(isTransactionAlreadyExistes.status==="REVERSED"){
            return res.status(400).json({
                message:"Transaction already reversed"
            })
        }
    }
    // 3. Check account status
    if(fromUserAccount.status!=="ACTIVE"||toUserAccount.status!=="ACTIVE"){
        return res.status(400).json({
            message:"From or To account is not active"
        })
    }
   // 4. Derive sender balance from ledger
   const balance=fromUserAccount.getBalance()
   if(balance<amount){
    return res.status(400).json({
        message:"Insufficient balance"
    })
   }
   // 5. Create transaction (PENDING)
   const transaction=new transactionModel({
    fromAccount:fromAccount,
    toAccount:toAccount,
    amount:amount,
    idempotencyKey:idempotencyKey,
    status:"PENDING"
   })
}


module.exports={createTransaction} 