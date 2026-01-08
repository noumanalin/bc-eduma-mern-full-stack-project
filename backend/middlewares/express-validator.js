import { body } from 'express-validator';

export const createBlogValidations = [
    body('title')
        .trim()
        .notEmpty().withMessage('Blog title must not be empty.')
        .isLength({ min: 5 }).withMessage('Blog title must have at least 5 characters.')
        .escape(),

    body('category')
        .optional()
        .trim()
        .escape(),

    body('body')
        .trim()
        .notEmpty().withMessage('Blog body is required.')
        .escape(),

    // body('tags')
    //     .optional()
    //     .isArray().withMessage('Tags must be an array.')
    //     .custom((arr) => arr.every(tag => typeof tag === 'string'))
    //     .withMessage('Each tag must be a string.')
];


export const signUpValidations = [
    body('name')
        .trim()
        .notEmpty().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
        .escape(),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters')
];

export const loginValidations = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('password')
        .trim()
        .notEmpty().withMessage('Password is required')
];

export const verifyOtpValidations = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format')
        .normalizeEmail(),

    body('otp')
        .trim()
        .notEmpty().withMessage('OTP is required')
        .isLength({ min: 4, max: 4 }).withMessage('OTP must be 4 digits')
        .isNumeric().withMessage('OTP must be numeric')
];
