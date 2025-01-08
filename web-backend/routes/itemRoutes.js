import express from 'express';
import { 
    fetchItems,
    createItem,
    updateItem,
    deleteItem
} from '../controllers/todoController.js';

const router = express.Router();

/* Route for fetching items */
router.get('/', fetchItems);

/* Route for creating an item */
router.post('/', createItem);

/* Route for updating an item */
router.put('/:id', updateItem);

/* Route for deleting an item */
router.delete('/:id', deleteItem);

export default router;