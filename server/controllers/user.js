import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator'
import crypto from "crypto"
import {sendEmail} from '../utils/sendEmail.js';

import User from '../models/user.js';
import Token from '../models/token.js';

export const signup = async (req, res) => {
    const {email, username, password, confirmPassword} = req.body;
    console.log(req.body)

    try {
        const isEmail = validator.isEmail(email);
        const pass = password.length > 4 ? true : false;

        if(!isEmail) return res.status(404).json({errorMsg: "Invalid Email", type: "email"});
        if (!pass) return res.status(404).json({errorMsg: "Password is too short", type: "password"});

        if(password !== confirmPassword) return res.status(400).json({errorMsg: "Passwords don't match.", type: "password"});

        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(404).json({errorMsg: "User already exist.", type: "email"});


        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await User.create({email, password: hashedPassword, username});

        let token = await new Token({
            userId: result._id,
            token: crypto.randomBytes(32).toString("hex"),
          }).save();
      
        const message = `Open this link to verify your MyInstagram account: ${process.env.BASE_URL}/user/${result._id}/verify/${token.token}`;
        await sendEmail(result.email, "Verify Email", message);
        return res.status(201).json({message: "Account created"});

    } catch (error) {
        console.log(error);   
    }
}

export const signin = async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({errorMsg: "Invalid email", type: "email"});

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect) return res.status(400).json({errorMsg: "Invalid password", type:"password"});

        //if(!user.verified) return res.status(400).json({errorMsg: "User not verified", type:"verified"}); 
        if(!user.verified) {
            // check if verify token for user exist
            const isToken = await Token.findOne({userId: user._id});
            if(isToken) {
                // if exist delete old token
                await Token.findOneAndDelete({userId: user._id});
            }

            // create new verify token and send new verification email
            let token = await new Token({
                userId: user._id,
                token: crypto.randomBytes(32).toString("hex"),
              }).save();
          
            const message = `Open this link to verify your MyInstagram account: ${process.env.BASE_URL}/user/${user._id}/verify/${token.token}`;
            await sendEmail(user.email, "Verify Email", message);
            return res.status(200).json({message: "New verify link send to email"});
        }


        const authToken = jwt.sign({email: user.email, id: user._id}, "test", {expiresIn: "1h"});

        const account = JSON.parse(JSON.stringify(user));
        delete account.password;

        res.status(200).json({account, authToken});
        
    } catch (error) {
        console.log(error);
    }
}

export const verify = async (req, res) => {
    const {id, token: verifyToken} = req.params;

    try {
        const user = await User.findOne({ _id: id });

        if (!user) return res.status(400).json({errorMsg: "Invalid link", type: "verification"});

        const token = await Token.findOne({
            userId: user._id,
            token: verifyToken,
        });
        if (!token) return res.status(400).json({errorMsg: "Invalid link", type: "verification"});

        await User.updateOne({ _id: user._id, verified: true });
        await Token.findByIdAndRemove(token._id);

        res.json({message: "Email verified sucessfully"});
    } catch (error) {
        console.log(error);
    }
}

export const requestResetPassword = async (req, res) => {
    const {email} = req.body;

    try {
        const isEmail = validator.isEmail(email);
        if(!isEmail) return res.status(400).json({errorMsg: "Invalid adres email", type: 'email'});

        const user = await User.findOne({email});
        if(!user) return res.status(404).json({errorMsg: "User doesn't exist", type: "email"});

        let token = await new Token({
            userId: user._id,
            token: crypto.randomBytes(32).toString("hex"),
        }).save();

        const message = `Open this link to reset your password: ${process.env.BASE_URL}/user/${user._id}/password/reset/${token.token}`;
        await sendEmail(user.email, "Password reset", message);
        res.status(200).json({message: "success"});

    } catch (error) {
        console.log(error);
    }
}