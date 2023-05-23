import { Router } from 'express';
const router = Router();
import { createArticle, fetchAllArticlesByUser, fetchOneArticleByUser, updateArticle, deleteArticle } from '../controllers/articleController.js';
import { validateToken } from '../middlewares/validateToken.js';
import { auth, admin } from '../middlewares/auth.js';
import { articleSchema } from '../schema/article.schema.js';
import { validate } from '../middlewares/validateSchema.js';
router.post('/api/v1/articles', validate(articleSchema), [validateToken, auth, admin], createArticle);
router.get('/api/v1/users/:userId(\\d+)/articles', [validateToken, auth], fetchAllArticlesByUser);
router.get('/api/v1/users/:userId(\\d+)/articles/:articleId(\\d+)', [validateToken, auth], fetchOneArticleByUser);
router.patch('/api/v1/articles/:articleId(\\d+)', validate(articleSchema), [validateToken, auth, admin], updateArticle);
router.delete('/api/v1/articles/:articleId(\\d+)', [validateToken, auth, admin], deleteArticle);
export { router };
//# sourceMappingURL=article.js.map