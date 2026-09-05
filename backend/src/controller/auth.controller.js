const userModel=require('../models/user.model')
const jwt=require('jsonwebtoken')

async function userRegisterController(req,res) {
   const {email,name,password}=req.body
   const isExists=await userModel.findOne({email:email})
   if(isExists){
    return res.status(422).json({
        message:"User already exists"
    })
   }
   const user = await userModel.create({
    email,
    name,
    password
   })
   const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user: {
        id: user._id,
        email: user.email,
        name: user.name
    },
    token
})

}
 async function userLoginController(req,res) {
    const {email,password}=req.body
    const user =await userModel.findOne({email:email}).select("+password")
    if(!user){
        return res.status(404).json({
            message:"User not found"
        })
    }
    const isPasswordValid = await user.comparePassword(password)
    if(!isPasswordValid){
        return res.status(401).json({
            message:"Invalid password"
        })
    }
    const token = jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"3d"})
    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        user: {
            id: user._id,
            email: user.email,
            name: user.name
        },
        token
    })

    
 }

module.exports={userRegisterController,userLoginController}