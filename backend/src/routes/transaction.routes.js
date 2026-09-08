const express = require("express");
const router = express.Router();
const transactionController = require('../controller/transaction.controller')
const authMiddleware=require("../middleware/auth.middleware")
router.post('/',authMiddleware.authMiddleware,transactionController.createTransaction)

module.exports=router