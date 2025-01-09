import Item from '../models/Item.js';
import { getUploadedImageUrl } from '../helpers/globalHelper.js';

/**
* DOCU: This function is used for fetching the items from Item DB. <br>
* This is being called when user want to get the items. <br>
* Last Updated Date: January 08, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @author Cesar
*/
const fetchItems = async (req, res) => {
    try {
        /* Query to get the items */
        const items = await Item.find();

        /* Check if items is not found */
        if(!items){
            return res.status(404).json({ message: 'No items found' });
        }
        
        res.status(200).json({ items });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
* DOCU: This function is used for fetching details for specific item. <br>
* This is being called when user want to get the details of an specific item. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @author Cesar
*/
const fetchItemById = async (req, res) => {
    try {
        /* Fetch the item by ID */
        const item = await Item.findById(req.params.id);

        /* Check if item is not found */
        if(!item){
            return res.status(404).json({ message: 'Item not found' });
        }
        
        res.status(200).json(item);
    } catch (error) {
        console.error('Error fetching item:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
* DOCU: This function is used for creating the item to the Item DB. <br>
* This is being called when user want to create an item. <br>
* Last Updated Date: January 08, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @author Cesar
*/
const createItem = async (req, res) => {
    try {
        /* Query to create an item using the data from the request body */
        const item = await Item.create(req.body);

        /* Check if there is an uploaded image file */
        if(req.file){
            /* Call getUploadedImageUrl helper to get the image url uploaded */
            const image_url = await getUploadedImageUrl(req.file);
            /* Assign and save to seminar the uploaded image URL to the speaker's image field */
            item.image = image_url;
            /* Save the updated item to the DB */
            await item.save();
        }

        res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        console.error('Error creating item:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
* DOCU: This function is used for updating the item to the Item DB. <br>
* This is being called when user want to update an item. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @author Cesar
*/
const updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, mealCategory, image, price, quantity } = req.body;
        
        let updated_data = {};

        /* Update fields only if new values are provided */
        if (name) updated_data.name = name;
        if (description) updated_data.description = description;
        if (mealCategory) updated_data.mealCategory = mealCategory;
        if (image) updated_data.image = image;
        if (price) updated_data.price = price;
        if (quantity) updated_data.quantity = quantity;

        /* Query to update an item */
        const item = await Item.findByIdAndUpdate(
            id,
            updated_data,
            { new: true, runValidators: true }
        );
        
        res.status(201).json({ message: 'Item updated successfully', item });
    } catch (error) {
        console.error('Error updating item:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

/**
* DOCU: This function is used for deleting the item to the Item DB. <br>
* This is being called when user want to delete an item. <br>
* Last Updated Date: January 08, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @author Cesar
*/
const deleteItem = async (req, res) => {
    try {
        /* Query to delete the item by ID */
        await Item.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        console.error('Error deleting item:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export { fetchItems, fetchItemById, createItem, updateItem, deleteItem };