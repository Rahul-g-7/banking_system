const express = require('express');
const app=express()
const morgan=require('morgan')
const cookieParser = require("cookie-parser");

const authRouter=require("./routes/auth.routes")

app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))


app.use("/api/auth",authRouter)


module.exports=app