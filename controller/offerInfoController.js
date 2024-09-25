const asyncHandler = require('express-async-handler')
const Job  = require('../model/offerInfoModel')


exports.addPost = asyncHandler(async(req, res) => {
    try{
        const postOffer =  await Job.create(req.body);
        res.status(201).json({
         message: "Job created successfully",
         data:postOffer
     })
    }catch(err){
     res.status(403).json({
        err:err
     })
    }
})

exports.getPosts = asyncHandler(async(req,res)=>{
   const queryStringObjet = {...req.query}
   const excludesFieldes = ["societeName" , "location","jobname"]
   excludesFieldes.forEach((field)=> delete queryStringObjet[field])
   
   var mongooseQuery = Job.find(queryStringObjet);
   
   if(req.query.societeName){
    mongooseQuery = mongooseQuery.regex('societeName', new RegExp(req.query.societeName, 'i'))
   }

   if(req.query.jobname){
    mongooseQuery = mongooseQuery.regex('offer', new RegExp(req.query.jobname, 'i'))
   }

   if(req.query.location){
    mongooseQuery = mongooseQuery.regex('city', new RegExp(req.query.location, 'i'))
   }


   const posts = await mongooseQuery
    
   
   res.status(201).json({
        message: "Get fetched successfully",
        data:posts
    })
})

exports.getOnePost = asyncHandler(async (req,res)=>{
    const id = req.params.id
    const post = await Job.findById(id)
    if(!post){
        res.status(404).json({
            message: "Post not found",
            data: null
        })
    }
    res.status(201).json({
        message: "Get fetched successfully",
        data: post
        })
    })


    exports.deletePost = asyncHandler(async (req,res)=>{
        const id = req.params.id
        const post = await Job.findOneAndDelete(id)
        if(!post){
            res.status(404).json({
                message: "Post not found",
                data: null
            })
        }
        res.status(201).json({
            message: "delete fetched successfully",
            data: post
            })
        })

        exports.updatePost = asyncHandler(async (req,res)=>{
            const id = req.params.id
            const post = await Job.findByIdAndUpdate(id , req.body , {new:true})
            if(!post){
                res.status(404).json({
                    message: "Post not found",
                    data: null
                })
            }
            res.status(201).json({
                message: "update fetched successfully",
                data: post
                })
            })