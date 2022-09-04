//~ Import Router
import { Router } from 'express';
const router = Router();

import { createArticle, fetchAllArticles, fetchOneArticle, updateArticle, deleteArticle } from '../controllers/articleController.js';

//~ Home
router.post('/api/v1/articles', createArticle);

router.get('/api/v1/articles', fetchAllArticles);
router.get('/api/v1/articles/:articleId(\\d+)', fetchOneArticle);

router.patch('/api/v1/articles/:articleId(\\d+)', updateArticle);
router.delete('/api/v1/articles/:articleId(\\d+)', deleteArticle);


//~ Export router
export { router };