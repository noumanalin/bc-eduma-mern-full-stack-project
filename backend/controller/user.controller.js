import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import crypto from 'crypto';

import { User } from '../models/user.js';
import { Order } from '../models/order.js'; 
import { sendOtpEmailQueue } from '../queueAndWorker/email.queue.js';




// ------------------------------------------ Helper Functions ---------------------------------------------------------------------------

const generateToken = (user) => jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: "7d" });

const setCookies = (res, token) => {
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "Lax",
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });
};

// ------------------------------------------ Controller Functions ---------------------------------------------------------------------------
// 1. Sing up / Registration 
export const signUp = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(400).json({ success: false, errArray: errorMessages, message: "🙏 Kindly fulfill all requirements." });
    }

    const { name, email, password } = req.body;

    try {
        const isUserExist = await User.findOne({ email });
        if (isUserExist) return res.status(400).json({ success: false, message: 'Email already exists, you can login' });

        const otp = crypto.randomInt(1000, 9999).toString();
        const otpExpiryTime = new Date(Date.now() + 60 * 60 * 1000);

        const user = await User.create({ name, email, password, otp, otpExpiryTime });

        await sendOtpEmailQueue.add('sendOtp', {name, email, otp})

        res.status(201).json({
            success: true,
            message: "Account created. Please verify your email via OTP.",
            user: { _id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified }
        });
    } catch (error) {
        console.log(`❌ signUp server controller error: ${error.message}`);
        res.status(500).json({ success: false, message:"Internal server error", error:error.message });
    }
};


// 2. OTP Verification -------------------------------------------------------------------------------------------------------------------------------------

export const verifyOtp = async (req, res) => {
    const { email, otp } = req.body;
    if (!email || !otp) return res.status(400).json({ success: false, message: "Email and OTP are required." });

    try {
        const user = await User.findOne({ email });
        if (!user || user.otp !== otp || user.otpExpiryTime < new Date()) {
            return res.status(400).json({ success: false, message: "Invalid or expired OTP." });
        }

        user.isVerified = true;
        user.otp = undefined;
        user.otpExpiryTime = undefined;
        await user.save();

        res.status(200).json({ success: true, message: "🎉 Email verified successfully Now, you can login." });
    } catch (error) {
        console.log(`❌ verifyOtp error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 3. Login -------------------------------------------------------------------------------------------------------------------------------------
export const login = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => err.msg);
        return res.status(400).json({ success: false, errArray: errorMessages, message: "🙏 Kindly fulfill all requirements." });
    }

console.log("JWT_SECRET:", process.env.JWT_SECRET); 

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ success: false, message: "User does not exist" });

        if (user && await user.comparePassword(password)) {
            const token = generateToken(user);
            setCookies(res, token);
            res.status(200).json({
                success: true,
                message: "Login successful",
                user: { _id: user._id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified },
                token
            });
        } else {
            res.status(400).json({ success: false, message: "Invalid credentials" });
        }
    } catch (error) {
        console.log(`❌ login error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 4. ---------------------------------------------------------------------------------------------------------------------------------------
export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({ success: true, message: "Logged out successfully." });
    } catch (error) {
        console.log(`❌ logout error: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 5. ---------------------------------------------------------------------------------------------------------------------------------------

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        const orders = await Order.find({ user: user._id })
            .populate('courses')
            .populate('pastPapers')
            .populate('user', 'name email');

        res.status(200).json({
            success: true,
            user,
            orders: orders.length ? orders : []
        });
    } catch (error) {
        console.log(`❌ Error in getProfile controller: ${error.message}`);
        res.status(500).json({ success: false, message: error.message });
    }
};
