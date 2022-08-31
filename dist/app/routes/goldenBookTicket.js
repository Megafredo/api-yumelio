import { Router } from 'express';
const router = Router();
import { createGoldenBookTicket, fetchAllGoldenBookTickets, updateGoldenBookTicket, deleteGoldenBookTicket } from '../controllers/goldenBookTicketsController.js';
router.post('/api/v1/gb-tickets', createGoldenBookTicket);
router.get('/api/v1/gb-tickets', fetchAllGoldenBookTickets);
router.patch('/api/v1/gb-tickets/:gbTicketId', updateGoldenBookTicket);
router.delete('/api/v1/gb-tickets/:gbTicketId', deleteGoldenBookTicket);
export { router };
//# sourceMappingURL=goldenBookTicket.js.map