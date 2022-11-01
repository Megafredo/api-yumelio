import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { GoldenBookTicket, User } from '../datamappers/index.js';
const createGoldenBookTicket = async (req, res) => {
    try {
        const isUser = req.user?.id;
        const userExist = await User.findOne(isUser);
        if (!userExist)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        if (isUser !== userExist.id)
            throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);
        req.body = { ...req.body, user_id: isUser };
        const goldenBookTicketCreated = await GoldenBookTicket.create(req.body);
        if (!goldenBookTicketCreated)
            throw new ErrorApi(`No data found !`, req, res, 400);
        return res.status(201).json('Golden book ticket successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllGoldenBookTickets = async (req, res) => {
    try {
        const isUser = req.user?.id;
        const userExist = await User.findOne(isUser);
        if (!userExist)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        const goldenBookTicket = await GoldenBookTicket.findAll();
        if (!goldenBookTicket)
            throw new ErrorApi(`No category found !`, req, res, 400);
        return res.status(200).json(goldenBookTicket);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateGoldenBookTicket = async (req, res) => {
    try {
        const isUser = req.user?.id;
        const user = await User.findOne(isUser);
        if (!user)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        const gbTicketId = +req.params.gbTicketId;
        if (isNaN(gbTicketId))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        const oneGoldenBookTicket = await GoldenBookTicket.findOneByUser(isUser, gbTicketId);
        if (!oneGoldenBookTicket)
            throw new ErrorApi(`GoldenBookTicket doesn't exist`, req, res, 400);
        if (isUser === user.id) {
            req.body = { ...req.body, user_id: isUser, id: gbTicketId };
            await GoldenBookTicket.update(req.body);
            res.status(200).json(`GoldenBookTicket successfully updated !`);
        }
        else
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteGoldenBookTicket = async (req, res) => {
    try {
        const isUser = req.user?.id;
        const user = await User.findOne(isUser);
        if (!user)
            throw new ErrorApi(`User doesn't exist`, req, res, 400);
        const gbTicketId = +req.params.gbTicketId;
        if (isNaN(gbTicketId))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        const goldenBookTicket = await GoldenBookTicket.findOneByUser(isUser, gbTicketId);
        if (!goldenBookTicket)
            throw new ErrorApi(`GoldenBookTicket doesn't exist`, req, res, 400);
        if (isUser === user.id && req.user?.role === 'admin') {
            await GoldenBookTicket.delete(gbTicketId);
            return res.status(200).json(`GoldenBookTicket successfully deleted`);
        }
        else
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createGoldenBookTicket, fetchAllGoldenBookTickets, updateGoldenBookTicket, deleteGoldenBookTicket };
//# sourceMappingURL=goldenBookTicketsController.js.map