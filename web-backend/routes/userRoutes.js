import express from 'express';
import { 
    register,
    signIn
} from '../controllers/userController.js';
import { signInValidationRules, registerValidationRules } from '../utils/validationRules.js';

const router = express.Router();

/* Route for user's registration */
router.post('/register', registerValidationRules, register);

/* Route for user's login */
router.post('/sign_in', signInValidationRules, signIn);

/* Route to log out user by clearing the auth_token cookie */
router.post("/logout", (req, res) => {
        res.cookie("auth_token", "", {
        expires: new Date(0),
        secure: process.env.NODE_ENV === "production",
    });
    res.send();
});


export default router;