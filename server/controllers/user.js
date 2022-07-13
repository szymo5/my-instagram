import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// import crypto from 'cryptojs';
// const crypto = import("crypto");
import crypto from "crypto"
import {sendEmail} from '../utils/sendEmail.js';

import User from '../models/user.js';
import Token from '../models/token.js';

export const signup = async (req, res) => {
    const {email, username, password, confirmPassword} = req.body;
    console.log(req.body)

    try {
        const existingUser = await User.findOne({email});

        if(existingUser) return res.status(404).json({message: "User already exists"});

        if(password !== confirmPassword) return res.status(400).json({message: "Passwords don't match."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, username});

        let token = await new Token({
            userId: result._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
      
        const message = `Open this link to verify your MyInstagram account: ${process.env.BASE_URL}/user/${result._id}/verify/${token.token}`;
        await sendEmail(result.email, "Verify Email", message);

    } catch (error) {
        console.log(error);   
    }
}

export const verify = async (req, res) => {
    const {id, token: verifyToken} = req.params;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) return res.status(400).json({message: "Invalid link"});

        const token = await Token.findOne({
            userId: user._id,
            token: verifyToken,
        });
        if (!token) return res.status(400).json({message: "Invalid link"});

        await User.updateOne({ _id: user._id, verified: true });
        await Token.findByIdAndRemove(token._id);

        res.json({message: "Email verified sucessfully"});
    } catch (error) {
        console.log(error);
    }
}