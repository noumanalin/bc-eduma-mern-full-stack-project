import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"] },
    email: { 
        type: String, 
        required: [true, "Email is required"], 
        unique: true, 
        lowercase: true,
        trim: true 
    },
    password: {
        type: String,  
        required: [true, "Password is required"],  
        minlength: [3, "Password must be at least 3 characters long"] 
    },
    cartCourses: [
        {
            quantity: { type: Number, default: 1 },
            product: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
        }
    ],
    cartPapers: [
        {
            quantity: { type: Number, default: 1 },
            product: { type: mongoose.Schema.Types.ObjectId, ref: "PastPaper" }
        }
    ],
    role: { type: String, enum: ["user", "admin"], default: "user" },
    otp: { type: String },
    otpExpiryTime: { type: Date },
    isVerified: { type: Boolean, default: false }
}, { timestamps: true });


// Pre-save Hook to hash password before saving to database
userSchema.pre("save", async function (next) {
    if (!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(5);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// john 123  ✔
// john 12334 ❌ => invalid credentials
// who to use: user.comparePassword(password)
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

export const User = mongoose.models.User || mongoose.model('User', userSchema); 
