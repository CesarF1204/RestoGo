import mongoose from 'mongoose';

/**
* DOCU: This is used for connecting to DB <br>
* Last Updated Date: January 10, 2025 <br>
* @function
* @author Cesar
*/
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

export default connectDB;