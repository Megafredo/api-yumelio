//~ Import Router 
import { Router } from 'express';
const router = Router();

//~ Main
import {router as mainRouter} from './main.js';
router.use(mainRouter);

//~ Export router
export { router };