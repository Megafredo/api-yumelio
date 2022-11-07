//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
import { baseConvertSvgByElement } from '../utils/baseConvertSvg.js';
import { coreController } from './coreController.js';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { userModel, projectModel } from '../models/index.js';

//~ -------- Controller
//& -------- createProject
const createProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Fetch if exist
    const userExist = await userModel.fetchUser(req, res, userId);

    //~ Guard Clauses
    if (userId !== userExist.id) throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);

    //~ Create project
    req.body = { ...req.body, user_id: userId };
    await projectModel.createItem(req.body, res);

    //~ Result
    return res.status(201).json('Project successfully created !');
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- fetchAllProjects
const fetchAllProjects = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const userId = await coreController.paramsHandler(req, res, 'userId');

    //~ Fetch if exist
    await userModel.fetchUser(req, res, userId);
    const projects = await projectModel.fetchAllItems(req, res, userId);

    //~ Convert logo category into base64
    const result = baseConvertSvgByElement(projects);

    //~ Result
    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- fetchOneProject
const fetchOneProject = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const userId = await coreController.paramsHandler(req, res, 'userId');
    const projectId = await coreController.paramsHandler(req, res, 'projectId');

    //~ Fetch if exist
    await userModel.fetchUser(req, res, userId);
    const oneProject = await projectModel.fetchOneItem(req, res, userId, projectId);

    //~Convert logo category into base64
    const result = baseConvertSvgByElement([oneProject]);

    //~ Result
    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- updateProject
const updateProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Is id a number ?
    const projectId = await coreController.paramsHandler(req, res, 'projectId');

    //~ Fetch if exist
    const user = await userModel.fetchUser(req, res, userId);
    await projectModel.fetchOneItem(req, res, userId, projectId);

    //~ Guard Clauses
    if (userId !== user.id && req.user?.role !== 'admin') throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);

    //~ Update project
    req.body = { ...req.body, id: projectId, user_id: userId, };
    await projectModel.updateItem(req);

    //~ Result
    res.status(200).json(`Project successfully updated !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- deleteProject
const deleteProject = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    //~ Is id a number ?
    const projectId = await coreController.paramsHandler(req, res, 'projectId');

    //~ Exist
    const user = await userModel.fetchUser(req, res, userId);
    await projectModel.fetchOneItem(req, res, userId, projectId);

    //~ Guard Clauses
    if (userId !== user.id && req.user?.role !== 'admin') throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);

    //~ Delete project
    await projectModel.deleteItem(projectId);

    //~ Result
    return res.status(200).json(`Project successfully deleted`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { createProject, fetchAllProjects, fetchOneProject, updateProject, deleteProject };
