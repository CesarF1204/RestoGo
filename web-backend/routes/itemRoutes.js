import express from 'express';
import { 
    fetchItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
} from '../controllers/itemController.js';

const router = express.Router();

/* Route for fetching items */
router.get('/', fetchItems);

/* Route for fetching an specific item */
router.get('/:id', fetchItemById);

/* Route for creating an item */
router.post('/', createItem);

/* Route for updating an item */
router.put('/:id', updateItem);

/* Route for deleting an item */
router.delete('/:id', deleteItem);

export default router;