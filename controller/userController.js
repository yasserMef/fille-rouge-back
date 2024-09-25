const {token} = require("../util/token")
const asyncHandler = require("express-async-handler")
const UserModel  = require("../model/userModel")
const bcrypt = require("bcryptjs/dist/bcrypt")
const ApiError = require("../util/apiError")


exports.signupService = asyncHandler(async(req,res,next)=>{
   const user = await UserModel.create(req.body)
    const tokenS = token(user._id)
    res.status(201).json({
        data : user,
        tokenS
    })
})

exports.loginService = asyncHandler(async(req,res,next)=>{
    await UserModel.findOne({email:req.body.email}).then(async(rslt)=>{
     console.log(rslt)
         if(!rslt){
           return  next(new ApiError("no user for this email",400))
         }
         const isPassword = await bcrypt.compare(req.body.password , rslt.password )
         if(!isPassword){
            return next(new ApiError("password invalid",400))
         }
         const tokenL = token(rslt._id)
      res.status(201).json({
           data:rslt,
           tokenL
         })
     })
     
 })

