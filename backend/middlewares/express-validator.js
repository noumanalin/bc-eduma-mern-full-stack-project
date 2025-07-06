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

