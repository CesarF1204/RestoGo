import mongoose from 'mongoose';

/**
* DOCU: Defines the schema for the item <br>
* It specifies the fields and their validation rules for a item record <br>
* Last Updated Date: January 08, 2025 <br>
* @constant itemSchema
* @type {Schema}
* @description Defines the Mongoose schema for seminars, including details about the title, description, date, speaker, and fees.
* @property {String} name - The name of the item. This field is required.
* @property {String} description - A brief description of the item. This field is required.
* @property {String} mealCategory - The category of the item. Options are 'breakfast', 'lunch', 'dinner', or 'drinks'. This field is required.
* @property {String} image - The image of the item. Default value is a placeholder image.
* @property {Number} price - The price for the item. This field is required.
* @property {Number} quantity - The quantity or number of available items. This field is required.
* @property {Date} createdAt - Timestamp of when the seminar was created (automatically added by Mongoose).
* @property {Date} updatedAt - Timestamp of when the seminar was last updated (automatically added by Mongoose).
* @author Cesar
*/
const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    mealCategory: { type: String, enum: ['breakfast', 'lunch', 'dinner', 'drinks'], required: true },
    image: { type: String, default: "https://i.imgur.com/oaNsfJ0.png" },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('Item', itemSchema);