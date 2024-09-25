const express = require("express");
const router = express.Router();
const {signupService,loginService} = require("../controller/userController")
const {uploadOfferImage}  = require("../middleware/uploadMiddelware");
const {postSingupValidator} = require("../util/validator/authValidator")


router.route("/signup").post(uploadOfferImage("file","image","users"),postSingupValidator,signupService)
router.route("/login").post(loginService)

module.exports =  router;