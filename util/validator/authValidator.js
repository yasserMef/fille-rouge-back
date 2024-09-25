const validatorError = require("../../middleware/validatorError")
const { check } = require("express-validator");
const UserModel  = require("../../model/userModel");



exports.postSingupValidator = [
    check("name").notEmpty().withMessage("name is required").isLength({min:3}).withMessage("short name"),
    check("email").notEmpty().withMessage("email is required").isEmail().withMessage("must be email").custom(async(val)=>{
       await UserModel.findOne({email:val}).then(rslt =>{
            console.log(rslt)
          if(rslt){
                console.log("hello")
           return Promise.reject(new Error("E-mail already exist"))
            }
        })
    }),
    check("password").notEmpty().withMessage("password is required").isLength({min:6}).withMessage("short password").custom((val , {req})=>{
        console.log(val)
        if(val != req.body.confirmPassword){
            throw new Error("Password confirmation incorrect")
        }
        return true;
    }),
    check("confirmPassword").notEmpty().withMessage("confirmPassword is required").isLength({min:6}).withMessage("short confirmPassword"),
    check("phone").isMobilePhone(["ar-MA" , "ar-EG"]),
    validatorError
    
]