const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name :{
        type : String,
        required : true,
        trim : true ,
    },

    slug :{
        type : String ,
        lowercase:true
    },
    email :{
        type : String,
        required : true,
        lowercase:true,
        unique : true
    },
    file : {
        type:String
    } ,
    password : {
        type : String,
        required : true,
        minLenght : [6 , "password is too short"],
        
     },

     role : {
        type : String ,
        enum : ['user' , 'company'],
        default : 'user'
     },
     phone:String
},{
    timestamps : true,
})

userSchema.pre("save" , async function(next){
    this.password = await bcrypt.hash(this.password , 12)
    next()
})

const UserModel = mongoose.model("User" , userSchema)
module.exports = UserModel