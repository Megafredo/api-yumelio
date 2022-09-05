//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { Request, Response } from 'express';
//~ Import Datamapper
import { Project, User } from '../datamappers/index.js';

//~ Controller
async function createProject(req: Request, res: Response) {
  try {
    const isUser = req.user?.id;
    
    //~ User exist ?
    const userExist = await User.findOne(isUser);
    if (!userExist) throw new ErrorApi(`User doesn't exist`, req, res, 400);

    if (isUser !== userExist.id) throw new ErrorApi(`Given informations not allows any modification`, req, res, 403);

    //~ Is project created ?
    req.body = { ...req.body, user_id: isUser };
    const projectCreated = await Project.create(req.body);

    if (!projectCreated) throw new ErrorApi(`No data found !`, req, res, 400);

    return res.status(201).json('Project successfully created !');
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}


async function fetchAllProjects(req: Request, res: Response) {
  try {

   //~ Is id a number ?
   const userId = +req.params.userId;
   if (isNaN(userId)) throw new ErrorApi(`Id must be a number`, req, res, 400);
   
   //~ User exist ?
   const user = await User.findOne(userId);
   if (!user) throw new ErrorApi(`User doesn't exist`, req, res, 400);
 
     const project = await Project.findAllProjectsByUserWithCategories(userId);
     if (!project) throw new ErrorApi(`No article found !`, req, res, 400);
     return res.status(200).json(project);
     
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}


async function fetchOneProject(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}
async function fetchAllProjectsWithCategories(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}
async function updateProject(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}
async function deleteProject(req: Request, res: Response) {
  try {
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
}

export { createProject, fetchAllProjects, fetchOneProject, fetchAllProjectsWithCategories, updateProject, deleteProject };
