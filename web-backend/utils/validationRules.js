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

export { itemValidationRules };