const express = require("express");
const router = express.Router();
const {addOffer,getOffers,deleteOffer} = require("../controller/offerController")
const {uploadOfferImage}  = require("../middleware/uploadMiddelware");
const {connect,role} = require("../middleware/authMiddleware")
const {postJobApplicationValidator , deleteOfferValidator} = require("../util/validator/offerValidator")

router.route("/").post(connect,role("user"),uploadOfferImage("file","pdf","cvs") ,addOffer).get(connect,role("company"),getOffers)
router.route("/:id").delete(connect,deleteOfferValidator,deleteOffer)
module.exports = router;