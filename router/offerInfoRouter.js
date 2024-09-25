const express = require("express");
const router = express.Router();
const {addPost , getPosts , getOnePost , deletePost , updatePost  } = require("../controller/offerInfoController")
const {uploadOfferImage}  = require("../middleware/uploadMiddelware");



router.route("/").post(uploadOfferImage("file","image","offer"),addPost).get(getPosts)
router.route("/:id").get(getOnePost).delete(deletePost).put(updatePost)

module.exports =  router;
