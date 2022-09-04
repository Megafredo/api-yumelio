//~ Import Router
import { Router } from 'express';
const router = Router();

import { createCategory, fetchAllCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';

//~ Home
router.post('/api/v1/categories', createCategory);

router.get('/api/v1/categories', fetchAllCategories);

router.patch('/api/v1/categories/:categoryId(\\d+)', updateCategory);
router.delete('/api/v1/categories/:categoryId(\\d+)', deleteCategory);


//~ Export router
export { router };