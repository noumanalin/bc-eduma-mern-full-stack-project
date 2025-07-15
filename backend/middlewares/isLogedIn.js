import jwt from 'jsonwebtoken';
import {User} from '../models/user.js';
import { json } from 'express';

export const isLogedin = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = req.cookies?.token || (authHeader?.startsWith('Bearer') ? authHeader.split(' ')[1] : null);

        if (!token) {
            return res.status(401).json({ success: false, message: "unauthorized access, plz login to use this service" });
        }

        const decodeUser = jwt.verify(token, process.env.JWT_SECRET);
        console.log(`decodeUser: ${JSON.stringify(decodeUser)}`);

        const findUser = await User.findById(decodeUser?.user?._id).select("-password");

        if (!findUser) {
            return res.status(404).json({ success: false, message: "User not found", decodeUser });
        }

        req.id = findUser._id;
        req.user = findUser
        next();
    } catch (error) {
        console.log(`❌ isLogedIn Middleware Error: ${error.message}`);
        return res.status(500).json({success:false, message:"internal server error", error:error.message})
    }
};