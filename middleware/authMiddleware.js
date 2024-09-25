const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken")
const UserModel  = require("../model/userModel")

exports.connect = asyncHandler(async(req,res,next)=>{
    //1-check if token exist
    //console.log(req.headers.authorization)
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bear")){
     token = req.headers.authorization.split(" ")[1]
     console.log(token)
     }
     if(!token){
       return next( new ApiError("you are not login" , 401))
     }
     //2-verify token
   const decoded =  jwt.verify(token , process.env.jwt_web_key)
   console.log(decoded)
   //3-check if user exist
   const currentUser = await UserModel.findById(decoded.userId)
   if(!currentUser){
     return next( new ApiError("the user that belong to this token does no longer exist" , 401))
   }
   //4-check if user chnage his password
   if(currentUser.passwordChangeAt){
     const passChangedTimeStamp = parseInt(currentUser.passwordChangeAt.getTime()/1000)
     if(passChangedTimeStamp > decoded.iat){
       return next( new ApiError("User recently chnaged his password , please login again" , 401))
     }

   }
   req.user = currentUser
   next()
})

exports.role = (...role) =>asyncHandler(async(req,res,next)=>{
  const user = req.user
  if(!role.includes(user.role)){
    return next(new ApiError("you are not authorized to perform this action" , 403))
    }
    next()
})