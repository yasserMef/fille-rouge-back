const { check } = require("express-validator");
const validatorError = require("../../middleware/validatorError")
const Job  = require('../../model/offerInfoModel')

exports.postJobApplicationValidator = [
    check("name")
        .notEmpty().withMessage("First name is required.")
        .isLength({ min: 2 }).withMessage("First name must be at least 2 characters long.")
        .trim(),
    
    check("lastName")
        .notEmpty().withMessage("Last name is required.")
        .isLength({ min: 2 }).withMessage("Last name must be at least 2 characters long.")
        .trim(),

    check("address")
        .notEmpty().withMessage("Address is required.")
        .isLength({ min: 10 }).withMessage("Address must be at least 10 characters long.")
        .trim(),

    check("experience")
        .notEmpty().withMessage("Experience is required.")
        .isLength({ min: 5 }).withMessage("Experience must be at least 5 characters long."),

    check("language")
        .notEmpty().withMessage("Language level is required.")
        .isIn(['beginner', 'intermediate', 'advanced', 'fluent']).withMessage("Language must be one of: beginner, intermediate, advanced, fluent."),

    check("email")
        .notEmpty().withMessage("Email is required.")
        .isEmail().withMessage("Invalid email format.")
        .normalizeEmail(),

    check("phone")
        .notEmpty().withMessage("Phone number is required.")
        .matches(/^[0-9]{10}$/).withMessage("Phone number must be 10 digits."),

    check("file")
        .notEmpty().withMessage("Resume file is required.")
        .isString().withMessage("Invalid file format."),

    check("offer")
        .notEmpty().withMessage("Offer ID is required.")
        .isMongoId().withMessage("Invalid offer ID format. Please provide a valid MongoDB ID.").custom(async(val)=>{
            const offer  = await Job.findById(val);
            if(!offer) {
                return Promise.reject('Invalid offer ID. Please provide a valid offer ID.');
                }
                return true;
            }),

    validatorError // Middleware pour gérer les erreurs de validation
];

exports.deleteOfferValidator = [
    exports.deleteOneJobValidator = [
        check("id").isMongoId().withMessage("Invalid job ID format. Please provide a valid MongoDB ID."),
        validatorError
    ]
]