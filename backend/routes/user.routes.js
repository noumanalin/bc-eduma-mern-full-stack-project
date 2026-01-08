import express from 'express';
import {  signUp, verifyOtp, login,  logout, getProfile } from '../controller/user.controller.js';
import {  signUpValidations,  loginValidations,  verifyOtpValidations } from '../middlewares/express-validator.js';
import { isLogedin } from '../middlewares/isLogedIn.js';

const router = express.Router();

router.post('/signup', signUpValidations, signUp);
router.post('/verify-otp', verifyOtpValidations, verifyOtp);
router.post('/login', loginValidations, login);
router.get('/logout', logout);
router.get('/me', isLogedin, getProfile);

export default router;