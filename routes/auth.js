
import { Router } from 'express';
import { registerValidationRules } from '../middleware/validateRegister.js';
import { loginValidationRules } from '../middleware/validateLogin.js';
import { validate } from '../middleware/validate.js';
import {register, login, refreshAccessToken, getProfile,logout} from '../controllers/authController.js';
import { authenticate } from '../middleware/authenticate.js';
import { authorizeAdmin } from '../middleware/authorizeAdmin.js';
import { rateLimiter } from '../services/rateLimiter.js';
import { makeAdmin } from '../controllers/userController.js';

const router = Router();

router.post('/register',rateLimiter ,registerValidationRules, validate, register);
router.post('/login',rateLimiter, loginValidationRules, validate, login);
router.post('/refresh', refreshAccessToken);
router.get('/profile', authenticate, getProfile); 
router.post('/logout', logout);
router.get('/admin', authenticate, authorizeAdmin, (req, res) => {
   res.json({ message: `Welcome Admin ${req.user.name}` }); 
});

router.patch('/make-admin/:id', authenticate, authorizeAdmin, makeAdmin);


export default router;
