import { ErrorApi } from '../services/errorHandler.js';
import { baseConvertSvgByElement } from '../utils/baseConvertSvg.js';
import { coreController } from './coreController.js';
import debug from 'debug';
const logger = debug('Controller');
import { userModel, projectModel } from '../models/index.js';
const createProject = async (req, res) => {
    try {
        const userId = req.user?.id;
        const userExist = await userModel.fetchUser(req, res, userId);
        if (userId !== userExist.id)
            throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);
        req.body = { ...req.body, user_id: userId };
        await projectModel.createItem(req.body, res);
        return res.status(201).json('Project successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllProjects = async (req, res) => {
    try {
        const userId = await coreController.paramsHandler(req, res, 'userId');
        await userModel.fetchUser(req, res, userId);
        const projects = await projectModel.fetchAllItems(req, res, userId);
        const result = baseConvertSvgByElement(projects);
        return res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchOneProject = async (req, res) => {
    try {
        const userId = await coreController.paramsHandler(req, res, 'userId');
        const projectId = await coreController.paramsHandler(req, res, 'projectId');
        await userModel.fetchUser(req, res, userId);
        const oneProject = await projectModel.fetchOneItem(req, res, userId, projectId);
        const result = baseConvertSvgByElement([oneProject]);
        return res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateProject = async (req, res) => {
    try {
        const userId = req.user?.id;
        const projectId = await coreController.paramsHandler(req, res, 'projectId');
        const user = await userModel.fetchUser(req, res, userId);
        await projectModel.fetchOneItem(req, res, userId, projectId);
        if (userId !== user.id && req.user?.role !== 'admin')
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        req.body = { ...req.body, id: projectId, user_id: userId, };
        await projectModel.updateItem(req);
        res.status(200).json(`Project successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteProject = async (req, res) => {
    try {
        const userId = req.user?.id;
        const projectId = await coreController.paramsHandler(req, res, 'projectId');
        const user = await userModel.fetchUser(req, res, userId);
        await projectModel.fetchOneItem(req, res, userId, projectId);
        if (userId !== user.id && req.user?.role !== 'admin')
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        await projectModel.deleteItem(projectId);
        return res.status(200).json(`Project successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createProject, fetchAllProjects, fetchOneProject, updateProject, deleteProject };
//# sourceMappingURL=projectController.js.map