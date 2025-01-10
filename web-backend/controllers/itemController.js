import Item from '../models/Item.js';
import { getUploadedImageUrl, paginationAndLimitation } from '../helpers/globalHelper.js';
import { validationResult } from "express-validator";
/**
* DOCU: This function is used for fetching the items from Item DB. <br>
* This is being called when user want to get the items. <br>
* Last Updated Date: January 09, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @author Cesar
*/
const fetchItems = async (req, res) => {
    try {
        /* Get needed data from query request */
        const { page, category, limit, search } = req.query;

        /* Call paginationAndLimitation helper to implement pagination and limitation */
        const { pageNumber, limitNumber, skip } = paginationAndLimitation({ page, limit });

        /* Initialize an empty filter object */
        const filter = {};

        /* Check if value for search is provided */
        if(search){
            filter.name = { $regex: search, $options: 'i' };
        }

        /* Check if value for category is provided */
        if(category){
            filter.mealCategory = { $regex: category, $options: 'i' };
        }

        /* This will be pass to the query to handle case sensitive data */
        const collation = { locale: 'en', strength: 2 };

        /* Query to Item DB implementing pagination with per page limitation and filtering when searching */
        const items = await Item.find(filter)
            .collation(collation) /* Use collation to handle case sensitive data */
            .skip(skip)
            .limit(limitNumber);

        /* Check if items is not found */
        if(!items){
            return res.status(404).json({ message: 'No items found' });
        }

        /* Get the total count of documents for pagination */
        const totalCount = await Item.countDocuments(filter);

        res.status(200).json({
            items,
            totalCount,
            totalPages: Math.ceil(totalCount / limitNumber),
            currentPage: pageNumber,
        });
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
* Last Updated Date: January 10, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @author Cesar
*/
const createItem = async (req, res) => {
    try {
        /* Handle validation errors */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(error => error.msg) });
        }

        /* Find item using item name */
        const existingItem = await Item.findOne({ name: req.body.name });

        /* Check if the item exists with the given item name */
        if (existingItem) return res.status(400).json({ message: 'Item already exists. Please try again' });

        /* Query to create an item using the data from the request body */
        const item = await Item.create(req.body);

        /* Check if there is an uploaded image file */
        if(req.file){
            /* Call getUploadedImageUrl helper to get the image url uploaded */
            const image_url = await getUploadedImageUrl(req.file);
           /* Set and assign image_url to item.image */
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
* Last Updated Date: January 10, 2025 <br>
* @function
* @param {object} req - request
* @param {object} res - response
* @author Cesar
*/
const updateItem = async (req, res) => {
    try {
        /* Handle validation errors */
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array().map(error => error.msg) });
        }

        const { id } = req.params;
        const item_to_update = req.body;

        /* Check if there is an uploaded image file */
        if(req.file){
            /* Call getUploadedImageUrl helper to get the image url uploaded */
            const image_url = await getUploadedImageUrl(req.file);
            /* Set and assign image_url to item_to_update.image */
            item_to_update.image = image_url;
        }

        /* Query to update an item */
        const item = await Item.findByIdAndUpdate(
            id,
            item_to_update,
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