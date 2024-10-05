const { check } = require("express-validator");
const validatorError = require("../../middleware/validatorError")


const JobModel = require('../../model/offerInfoModel'); // Adjust the path to your Job model

exports.postJobValidator = [
    check("societeName")
        .notEmpty().withMessage("Company name is required")
        .isLength({ min: 3 }).withMessage("Company name is too short")
        .custom(async (value) => {
            const existingJob = await JobModel.findOne({ societeName: value });
            if (existingJob) {
                return Promise.reject(new Error("Company name already exists"));
            }
        }),
    
    check("offer")
        .notEmpty().withMessage("Offer is required")
        .isLength({ min: 5 }).withMessage("Offer description is too short"),
    
    check("offerInscription")
        .notEmpty().withMessage("Offer inscription is required"),
    
    check("city")
        .notEmpty().withMessage("City is required"),
    
   /*  check("creationDate")
        .notEmpty().withMessage("Creation date is required")
        .isISO8601().withMessage("Creation date must be a valid date"), */
    
    check("salary")
        .notEmpty().withMessage("Salary is required")
        .isNumeric().withMessage("Salary must be a number"),
    
    check("contractType")
        .notEmpty().withMessage("Contract type is required")
        .isIn(['CDI', 'CDD', 'Freelance', 'Stage']).withMessage("Contract type must be one of CDI, CDD, Freelance, or Stage"),
    
    check("jobType")
        .notEmpty().withMessage("Job type is required")
        .isIn(['Temps plein', 'Temps partiel', 'Remote']).withMessage("Job type must be one of Temps plein, Temps partiel, or Remote"),
    
    check("experienceLevel")
        .notEmpty().withMessage("Experience level is required")
        .isIn(['Junior', 'Intermédiaire', 'Senior']).withMessage("Experience level must be one of Junior, Intermédiaire, or Senior"),
    
        validatorError
];

exports.getOneJobValidator = [
    check("id").isMongoId().withMessage("Invalid job ID format. Please provide a valid MongoDB ID."),
    validatorError
]

exports.updateOneJobValidator = [
    check("id").isMongoId().withMessage("Invalid job ID format. Please provide a valid MongoDB ID."),
    validatorError
]

exports.deleteOneJobValidator = [
    check("id").isMongoId().withMessage("Invalid job ID format. Please provide a valid MongoDB ID."),
    validatorError
]