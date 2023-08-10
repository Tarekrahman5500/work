const {body, validationResult} = require('express-validator');
const ErrorResponse = require("./errorResponse");

exports.validateCategoryAddRequest = [
    body('title')
        .notEmpty()
        .isString()
        .withMessage('Title must be a string'),
    body('description')
        .notEmpty()
        .isString()
        .withMessage('Description must be a string'),
    body('active')
        .optional()

];


exports.validateCategoryUpdateRequest = [
    body('title')
        .optional()
        .isString()
        .withMessage('Title must be a string'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body('active')
        .optional()

];

exports.validateItemInsertRequest = [
    body('category')
        .notEmpty()
        .withMessage('Category is required'),
    body('title')
        .notEmpty()
        .withMessage('Title is required')
        .isString()
        .withMessage('Title must be a string'),
    body('description')
        .notEmpty()
        .withMessage('Description is required')
        .isString()
        .withMessage('Description must be a string'),
    body('active')
        .optional()

];

exports.validateItemUpdateRequest = [
    body('category')
        .optional(),
    body('title')
        .optional()
        .isString()
        .withMessage('Title must be a string'),
    body('description')
        .optional()
        .isString()
        .withMessage('Description must be a string'),
    body('active')
        .optional()

];

exports.isRequestValidated = async (req, res, next) => {
    const errors = validationResult(req);
    //  console.log(errors)
    if (errors.array().length > 0) {
        // return res.status(400).json({ error: errors.array()[0].msg })
        next(new ErrorResponse(errors.array()[0].msg, 401))
    }
    next();
}