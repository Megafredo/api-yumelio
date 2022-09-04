import { Router } from 'express';
const router = Router();
import { createCategory, fetchAllCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';
router.post('/api/v1/categories', createCategory);
router.get('/api/v1/categories', fetchAllCategories);
router.patch('/api/v1/categories/:categoryId(\\d+)', updateCategory);
router.delete('/api/v1/categories/:categoryId(\\d+)', deleteCategory);
export { router };
//# sourceMappingURL=category.js.map