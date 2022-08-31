import { Router } from 'express';
const router = Router();
import { createGoldenBookTicket, fetchAllGoldenBookTickets, updateGoldenBookTicket, deleteGoldenBookTicket } from '../controllers/goldenBookTicketsController.js';
router.post('/api/v1/goldenbook-tickets', createGoldenBookTicket);
router.get('/api/v1/goldenbook-tickets', fetchAllGoldenBookTickets);
router.patch('/api/v1/goldenbook-tickets/:goldenBookTicketId', updateGoldenBookTicket);
router.delete('/api/v1/goldenbook-tickets/:goldenBookTicketId', deleteGoldenBookTicket);
export { router };
//# sourceMappingURL=goldenBookTickets.js.map