import { body } from 'express-validator';



export const loginValidationRules = [
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').notEmpty().withMessage('Password is required').trim(),
];

