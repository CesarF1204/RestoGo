import Item from '../models/Item.js';

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
        
        res.status(201).json({ message: 'Item created successfully', item });
    } catch (error) {
        console.error('Error fetching items:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export { fetchItems, createItem };