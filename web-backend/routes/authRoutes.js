import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

/* Route to validate the token and get user details (requires authentication) */
router.get('/validate_token', authMiddleware, (req, res) => {
    res.status(200).json({
        token: req.token,
        user: req.user
    });
});

export default router;