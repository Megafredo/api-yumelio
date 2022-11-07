import { ErrorApi } from '../services/errorHandler.js';
import { coreController } from './coreController.js';
import debug from 'debug';
const logger = debug('Controller');
import { userModel, goldenBookModel } from '../models/index.js';
const createGoldenBookTicket = async (req, res) => {
    try {
        const userId = req.user?.id;
        const userExist = await userModel.fetchUser(req, res, userId);
        if (userId !== userExist.id)
            throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);
        req.body = { ...req.body, user_id: userId };
        await goldenBookModel.createItem(req, res);
        return res.status(201).json('Golden book ticket successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllGoldenBookTickets = async (req, res) => {
    try {
        const userId = req.user?.id;
        await userModel.fetchUser(req, res, userId);
        const goldenBookTicket = await goldenBookModel.fetchAllItems(req, res);
        return res.status(200).json(goldenBookTicket);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateGoldenBookTicket = async (req, res) => {
    try {
        const userId = req.user?.id;
        const gbTicketId = await coreController.paramsHandler(req, res, 'gbTicketId');
        const user = await userModel.fetchUser(req, res, userId);
        await goldenBookModel.fetchOneItem(req, res, userId, gbTicketId);
        if (userId !== user.id)
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        req.body = { ...req.body, user_id: userId, id: gbTicketId };
        await goldenBookModel.updateItem(req);
        res.status(200).json(`GoldenBookTicket successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteGoldenBookTicket = async (req, res) => {
    try {
        const userId = req.user?.id;
        const gbTicketId = await coreController.paramsHandler(req, res, 'gbTicketId');
        const user = await userModel.fetchUser(req, res, userId);
        await goldenBookModel.fetchOneItem(req, res, userId, gbTicketId);
        if (userId !== user.id && req.user?.role !== 'admin')
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        await goldenBookModel.deleteItem(gbTicketId);
        return res.status(200).json(`GoldenBookTicket successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createGoldenBookTicket, fetchAllGoldenBookTickets, updateGoldenBookTicket, deleteGoldenBookTicket };
//# sourceMappingURL=goldenBookTicketsController.js.map