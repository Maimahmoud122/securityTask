// middleware/validateRegister.js
import { body, validationResult } from 'express-validator';

export const registerValidationRules = [
  body('name').notEmpty().trim().escape().isString(),
  body('email').isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
  .trim(),body("role")
];

// export const validate = (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }
//   next();
// };
