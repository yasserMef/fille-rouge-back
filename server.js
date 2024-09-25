const express = require("express");

const app = express();
const dotenv = require("dotenv")
const cors = require("cors");
const path = require("path")

const database = require("./database/database");

const offerInfoRouter = require("./router/offerInfoRouter")
const userRouter = require("./router/userRouter")

dotenv.config()

database();
app.use(express.json())
app.use(express.static(path.join(__dirname,"uploads")))
app.use(cors())

app.use("/v1/api/offerInfo" , offerInfoRouter)
app.use("/v1/api/auth" , userRouter)


app.all("*",(req,res,next)=>{
    next(new ApiError(`Can't find this route: ${req.originalUrl}`,400))
  })
  
  
  app.use((err,req,res,next)=>{
      err.statusCode = err.statusCode || 500 
      err.status = err.status || "error"
      res.status(err.statusCode).json({
          statusCode : err.statusCode,
          status :err.status,
          message:err.message,
          stack : err.stack
      })
  })

const port = process.env.PORT||8000
const server = app.listen(port, ()=>{
    console.log("Server is running on port 8000");
})

process.on("unhandledRejection",(err)=>{
    console.log(`unhandledRejection : ${err.name}|${err.message}`)
    if(server.close){
        process.exit(1)
    }

})
