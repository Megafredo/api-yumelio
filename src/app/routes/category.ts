//~ Import Router
import { Router } from 'express';
const router = Router();

import { createCategory, fetchAllCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';

//~ Home
router.post('/api/v1/categories', createCategory);

router.get('/api/v1/categories', fetchAllCategories);

router.patch('/api/v1/categories/:categoryId', updateCategory);
router.delete('/api/v1/categories/:categoryId', deleteCategory);


//~ Export router
export { router };