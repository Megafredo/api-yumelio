//~ Import Router
import { Router } from 'express';
const router = Router();

import { renderHomePage } from '../controllers/mainController.js';

//~ Home
router.get('/', renderHomePage);

//~ Export router
export { router };
