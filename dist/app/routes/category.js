import { Router } from 'express';
const router = Router();
import { createCategory, fetchAllCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';
import { validateToken } from '../middlewares/validateToken.js';
import { auth, admin } from '../middlewares/auth.js';
router.post('/api/v1/categories', [validateToken, auth, admin], createCategory);
router.get('/api/v1/categories', fetchAllCategories);
router.patch('/api/v1/categories/:categoryId(\\d+)', [validateToken, auth, admin], updateCategory);
router.delete('/api/v1/categories/:categoryId(\\d+)', [validateToken, auth, admin], deleteCategory);
export { router };
//# sourceMappingURL=category.js.map