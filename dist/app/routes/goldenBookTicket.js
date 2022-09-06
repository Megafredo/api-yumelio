import { Router } from 'express';
const router = Router();
import { createGoldenBookTicket, fetchAllGoldenBookTickets, updateGoldenBookTicket, deleteGoldenBookTicket } from '../controllers/goldenBookTicketsController.js';
import { validateToken } from '../middlewares/validateToken.js';
import { auth } from '../middlewares/auth.js';
import { gbTicketSchema } from '../schema/goldenBookTicket.schema.js';
import { validate } from '../middlewares/validateSchema.js';
router.post('/api/v1/gb-tickets', validate(gbTicketSchema), [validateToken, auth], createGoldenBookTicket);
router.get('/api/v1/gb-tickets', [validateToken, auth], fetchAllGoldenBookTickets);
router.patch('/api/v1/gb-tickets/:gbTicketId(\\d+)', validate(gbTicketSchema), [validateToken, auth], updateGoldenBookTicket);
router.delete('/api/v1/gb-tickets/:gbTicketId(\\d+)', [validateToken, auth], deleteGoldenBookTicket);
export { router };
//# sourceMappingURL=goldenBookTicket.js.map