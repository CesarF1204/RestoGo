import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import { capitalizeFirstLetter } from '../helpers/globalHelper.js';

/**
* DOCU: This function is used to handle the user's registration. <br>
* This is being called when registering a new account. <br>
* Last Updated Date: January 10, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @author Cesar
*/
const register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(error => error.msg) });
        }

        const { firstName, lastName, email, password } = req.body;

        /* Find user using email */
        const existingUser = await User.findOne({ email });

        /* Check if the user exists with the given email */
        if (existingUser) return res.status(400).json({ message: 'Email already exists. Please try again' });

        /* First letter and other letter after space to be capitalized
            Use trim to remove spaces from the start of inputted value */
        const capitalizedFirstName = (capitalizeFirstLetter(firstName)).trim();
        const capitalizedLastName = (capitalizeFirstLetter(lastName)).trim();

        /* Hash the user's password using bcrypt */
        const hashedPassword = await bcrypt.hash(password.trim(), 10);

        /* Use trim to remove spaces from the start of inputted value */
        const emailAddress = email.trim();

        /* Get the total number of registered users; assign 'admin' role to the first user */
        const user_count = await User.countDocuments();
        const user_role = user_count === 0 ? 'admin' : 'user';

        /* Create a new user in the database */
        const user = await User.create({ firstName: capitalizedFirstName, lastName: capitalizedLastName, email: emailAddress, password: hashedPassword, role: user_role });

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Registration failed. Please try again', error});
    }
};

/**
* DOCU: This function is used to handle the user's login. <br>
* This is being called when user is logging in. <br>
* Last Updated Date: January 10, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @author Cesar
*/
const signIn = async (req, res) => {
    try {
        /* Handle validation errors */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(error => error.msg) });
        }

        const { email, password } = req.body;
        
        /* Check if the user exists with the given email */
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        /* Compare the provided password with the hashed password stored in the database */
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        /* Generate a JWT (JSON Web Token) */
        const token = jwt.sign(
            { userId: user._id }, /* Payload */
            process.env.JWT_SECRET, /* Secret key */
            {
            expiresIn: "1d",
            }
        );

        /* Set the token as a cookie in the response */
        res.cookie("auth_token", token, {
            httpOnly: true, /* Prevent JavaScript from accessing the cookie */
            secure: process.env.NODE_ENV === "production", /* Use secure flag in production */
            maxAge: 86400000, /* Cookie expires in 1 day */
        });

        res.status(200).json({token, user: { id: user._id, name: `${user.firstName} ${user.lastName}`, email: user.email, role: user.role } });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something went wrong" });
    }
};

export { register, signIn };