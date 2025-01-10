import { check } from "express-validator";

const itemValidationRules = [
    /* Validate fields */
    check('name')
        .isLength({ min: 1 }).withMessage('Name is required'),
    check('description')
        .isLength({ min: 1 }).withMessage('Description is required'),
    check('price')
        .isLength({ min: 1 }).withMessage('Price is required')
        .isFloat({ min: 0 }).withMessage('Price must be greater than or equal to 0'),
    check('quantity')
        .isLength({ min: 1 }).withMessage('Quantity is required')
        .isInt({ min: 0 }).withMessage('Quantity must be greater than or equal to 0'),
];

const signInValidationRules = [
    /* Validate fields */
    check('email')
        .isEmail().withMessage('Invalid email address'),
    check('password')
        .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long')
];

const registerValidationRules = [
    /* Validate fields */
    check('firstName')
        .isLength({ min: 1 }).withMessage('First Name is required')
        .matches(/^[A-Za-z\s]+$/).withMessage('First Name should only contain letters and spaces'),

    check('lastName')
        .isLength({ min: 1 }).withMessage('Last Name is required')
        .matches(/^[A-Za-z\s]+$/).withMessage('Last Name should only contain letters and spaces'),

    check('email')
        .isEmail().withMessage('Invalid email address'),

    check('password')
        .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long')
];

export { itemValidationRules, signInValidationRules, registerValidationRules };