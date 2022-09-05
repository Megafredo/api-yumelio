import { Router } from 'express';
const router = Router();
import { createArticle, fetchAllArticlesByUser, fetchOneArticleByUser, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { validateToken } from '../middlewares/validateToken.js';
import { auth, admin } from '../middlewares/auth.js';
router.post('/api/v1/articles', [validateToken, auth, admin], createArticle);
router.get('/api/v1/users/:userId(\\d+)/articles', [validateToken, auth], fetchAllArticlesByUser);
router.get('/api/v1/users/:userId(\\d+)/articles/:articleId(\\d+)', [validateToken, auth], fetchOneArticleByUser);
router.patch('/api/v1/articles/:articleId(\\d+)', [validateToken, auth, admin], updateArticle);
router.delete('/api/v1/articles/:articleId(\\d+)', [validateToken, auth, admin], deleteArticle);
export { router };
//# sourceMappingURL=article.js.map