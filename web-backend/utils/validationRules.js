import { check } from "express-validator";

/**
* DOCU: This is set of rules for validating input fields for creating and updating an item <br>
* This is being called when admin create or update an item. <br>
* Last Updated Date: January 10, 2025 <br>
* @function
* @author Cesar
*/
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

/**
* DOCU: This is set of rules for validating input fields for account sign-in <br>
* This is being called when user wants to sign in. <br>
* Last Updated Date: January 10, 2025 <br>
* @function
* @author Cesar
*/
const signInValidationRules = [
    /* Validate fields */
    check('email')
        .isEmail().withMessage('Invalid email address'),
    check('password')
        .isLength({ min: 6 }).withMessage('Password should be at least 6 characters long')
];

/**
* DOCU: This is set of rules for validating input fields for account registration <br>
* This is being called when registering an account. <br>
* Last Updated Date: January 10, 2025 <br>
* @function
* @author Cesar
*/
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