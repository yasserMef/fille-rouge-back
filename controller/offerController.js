const asyncHandler = require('express-async-handler')
const JobModdel = require("../model/addJobModel")

exports.addOffer = asyncHandler(async(req,res)=>{
   const offer = await JobModdel.create(req.body)
   res.status(201).json({
    message: "offer created successfully",
    data: offer
   })
})

exports.getOffers = asyncHandler(async(req,res)=>{
   const offers = await JobModdel.find().populate({
      path:"offer",
      select:"user"
   })
   const offersByUser =offers.filter(rslt => rslt.offer?.user?.toString() === req.user.id);
   res.status(200).json({
      data: offersByUser
      })
})

exports.deleteOffer = asyncHandler(async(req , res)=>{
const id = req.params.id 
const offer = await JobModdel.findOneAndDelete(id)
res.status(200).json({
   data: offer
   })
})
