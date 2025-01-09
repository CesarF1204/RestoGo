import express from 'express';
import { 
    fetchItems,
    fetchItemById,
    createItem,
    updateItem,
    deleteItem,
} from '../controllers/itemController.js';
import { itemValidationRules } from '../utils/validationRules.js';
import upload from '../utils/uploadFile.js';

const router = express.Router();

/* Route for fetching items */
router.get('/', fetchItems);

/* Route for fetching an specific item */
router.get('/:id', fetchItemById);

/* Route for creating an item */
router.post('/', upload.single('image'), itemValidationRules, createItem);

/* Route for updating an item */
router.put('/:id', upload.single('image'), itemValidationRules, updateItem);

/* Route for deleting an item */
router.delete('/:id', deleteItem);

export default router;