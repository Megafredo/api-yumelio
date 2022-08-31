import { Router } from 'express';
const router = Router();
import { renderHomePage } from '../controllers/mainController.js';
router.get('/', renderHomePage);
export { router };
//# sourceMappingURL=main.js.map