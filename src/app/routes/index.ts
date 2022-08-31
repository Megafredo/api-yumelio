//~ Import Router 
import { Router } from 'express';
const router = Router();

//~ Main
import {router as mainRouter} from './main.js';
router.use(mainRouter);

//~ User
import {router as userRouter} from './user.js';
router.use(userRouter);

//~ Article Portfolio
import {router as projectRouter} from './project.js';
router.use(projectRouter);

//~ Article Project
import {router as articleRouter} from './article.js';
router.use(articleRouter);

//~ Golden Book
import {router as goldenBookTicketRouter} from './goldenBookTicket.js';
router.use(goldenBookTicketRouter);

//~ Export router
export { router };