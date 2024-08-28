import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from "../model/user.model.js";
import { v4 as uuidv4 } from 'uuid';
import { emailVerification, forgotPasswordEmail } from '../service/email.template.js';
import sendMail from '../service/email.service.js';

//REGISTER USERS
export const register = async (req, res) => {
    const { first_name, last_name, email, gender, avatar, domain, available, password } = req.body;
    const normalizedEmail = email.toLowerCase().trim(); // Normalize email for consistency

    try {
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(400).json({ message: "Email is already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 6);

        // Create a new user
        const newUser = await User.create({
            id: Number(uuidv4()),
            first_name,
            last_name,
            email: normalizedEmail,
            gender,
            avatar,
            domain,
            available,
            password: hashPassword,
        });


        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const verificationLink = `${process.env.FRONTEND_URL}/verify?verify=${token}&email=${normalizedEmail}`;

        // Send email
        await sendMail(emailVerification(normalizedEmail, verificationLink));

        res.status(201).json({ message: "Signup successful", data: newUser, token });
    } catch (error) {
        console.error("Something went wrong during user registration:", error);
        res.status(500).json({ message: "An error occurred during registration" });
    }
};

//LOGIN USERS
export const login = async (req, res) => {
    const { email, password } = req.body;
    const trimmedEmail = email.trim();

    try {
        const existingUser = await User.findOne({ email: trimmedEmail });
        if (!existingUser) {
            return res.status(400).json({ message: "User not found. Please sign up." });
        }

        if (!existingUser.verify) {
            return res.status(400).json({ message: "Please verify your account before proceeding." });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            status: 200,
            message: "Login successful",
            name: `${existingUser.first_name} ${existingUser.last_name}`,
            token,
        });
    } catch (error) {
        console.error("Something went wrong during login:", error);
        return res.status(500).json({ message: "An error occurred during login" });
    }
};


// VERIFY USER
export const verify = async (req, res) => {
    try {
        const { token } = req.body;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            return res.status(404).json({ status: "fail", message: "User does not exist." });
        }

        if (user.verify) {
            return res.status(400).json({ status: "fail", message: "User is already verified." });
        }

        user.verify = true;
        await user.save();

        return res.status(200).json({ status: 200, message: "User verified successfully." });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ status: "error", message: "Invalid token." });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ status: "error", message: "Token has expired." });
        }

        return res.status(500).json({ status: "error", message: "An error occurred while processing your request." });
    }
};


// Forgot password logic
export const forgotPassword = async (req, res) => {
    try {
        let { email } = req.body;
        email = email.toLowerCase().trim();

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ status: "fail", message: "User does not exist." });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        const resetLink = `${process.env.FRONTEND_URL}/changepassword?resetPasswordToken=${token}&email=${email}`;

        const name = `${user.first_name} ${user.last_name}`
        await sendMail(forgotPasswordEmail(email, name, resetLink));

        return res.status(200).json({ status: 200, message: "Reset password link sent!" });

    } catch (error) {
        console.error("Error in forgotPassword:", error);
        return res.status(500).json({ status: "error", message: "An error occurred while processing your request." });
    }
};


// Change password
export const changePassword = async (req, res) => {
    try {
        const { token, password } = req.body;

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(400).json({ status: "fail", message: "Invalid token." });
        }

        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            return res.status(404).json({ status: "fail", message: "User does not exist." });
        }

        const hashPassword = await bcrypt.hash(password, 5);

        user.password = hashPassword;
        await user.save();

        return res.status(200).json({ status: 200, message: "Password changed successfully!" });

    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(400).json({ status: "error", message: "Invalid token." });
        }
        return res.status(500).json({ status: "error", message: "An error occurred while processing your request." });
    }
};
