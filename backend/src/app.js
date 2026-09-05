const express = require('express');
const app=express()
const morgan=require('morgan')
const cookieParser = require("cookie-parser");

const authRouter=require("./routes/auth.routes")
const accountRouter=require("./routes/account.routes")


app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))


app.use("/api/auth",authRouter)
app.use("/api/account",accountRouter)

module.exports=app