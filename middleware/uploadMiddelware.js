const multer = require("multer")
const { v4: uuidv4 } = require('uuid');


const multerOptions = (type , destFile) =>{
    const multerStorage=multer.diskStorage({
        destination : function(req,file,cb){
          cb(null , `uploads/${destFile}`)
        },
        filename : function(req,file,cb){
          const ext = file.mimetype.split("/")[1]
          const filename = `${destFile}-${uuidv4()}-${Date.now()}.${ext}`
          req.body.file = filename
          console.log(req.body.file)
          cb(null, filename)
        }
      })
    
      const multerFilter=(req,file,cb)=>{
        
        const ext = file.mimetype.split("/")[1]
       
        if(file.mimetype.startsWith("image")&& type == "image"){
           cb(null , true)
        }else if(ext == "pdf" && type == "pdf"){
            cb(null , true)
        }else{
            cb(new ApiError("Only image allowed",400),false)
        }
      
      }
    
    
    const upload = multer({storage:multerStorage , fileFilter:multerFilter })
    return upload
}


exports.uploadOfferImage  =(fieldName , type ,destFile)=> multerOptions(type,destFile).single(fieldName)