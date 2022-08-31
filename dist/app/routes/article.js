import { Router } from 'express';
const router = Router();
import { createArticle, fetchOneArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';
router.post('/api/v1/articles', createArticle);
router.get('/api/v1/articles/:articleId', fetchOneArticle);
router.patch('/api/v1/articles/:articleId', updateArticle);
router.delete('/api/v1/articles/:articleId', deleteArticle);
export { router };
//# sourceMappingURL=article.js.map