import express from 'express';
import { 
    fetchItems,
    createItem, 
} from '../controllers/todoController.js';

const router = express.Router();

/* Route for fetching items */
router.get('/', fetchItems);

/* Route for creating an item */
router.post('/', createItem);

export default router;