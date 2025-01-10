import User from '../models/User.js';
import jwt from 'jsonwebtoken';

/**
* DOCU: This function is used as a middleware to authenticate users based on a token provided in the Authorization header. <br>
* This is being called when user logged-in and token will be created. <br>
* Last Updated Date: January 10, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @param next - A callback function to pass control to the next middleware in the chain
* @author Cesar
*/
const authMiddleware = async (req, res, next) => {
    /* Retrieve the token from the cookies */
    const token = req.cookies["auth_token"];

    /* Check if no token is provided, respond with an authorization error */
    if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

    try {
        /* Verify the token using the secret key */
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        /* Fetch user details by userId from the decoded token and exclude the password field */
        req.user = await User.findById(decoded.userId).select('-password');
        req.token = token;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Token is invalid or expired.' });
    }
};

export default authMiddleware;