import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary'; 
import connectDB from './config/db.js';
import itemRoutes from './routes/itemRoutes.js';

/* Load environment variables from .env file */
dotenv.config();

/* Connect to the database */
connectDB();

/* Cloudinary configuration */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();

/* Enable CORS with specific frontend URL and credentials */
app.use(cors({
    origin: process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

/* Middleware to parse JSON and URL encoded data */
app.use(express.json({ limit: '50mb' })); /* Parse JSON bodies */
app.use(express.urlencoded({ extended: true })); /* Parse URL-encoded bodies */

/* Define routes for different API endpoints */
app.use('/api/items', itemRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));