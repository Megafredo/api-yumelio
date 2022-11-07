//~ Import modules
import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';
import { baseConvertSvg } from '../utils/baseConvertSvg.js';
import { coreController } from './coreController.js';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
//~ Import Models
import { categoryModel } from '../models/index.js';

//~ Controller
//& -------- createCategory
const createCategory = async (req: Request, res: Response) => {
  try {
    //~ Guard Clauses
    if (req.user?.role !== 'admin') throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);

    //~ Create Category
    await categoryModel.createItem(req, res);

    //~ Result
    return res.status(201).json('Category successfully created !');
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- fetchAllCategories
const fetchAllCategories = async (req: Request, res: Response) => {
  try {
    //~ Fetch if exist
    const categories = await categoryModel.fetchAllItems(req, res);

    //~ Convert Svg
    const result = baseConvertSvg(categories);

    //~ Result
    return res.status(200).json(result);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- updateCategory
const updateCategory = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const categoryId = await coreController.paramsHandler(req, res, 'categoryId');

    //~ Fetch if exist
    await categoryModel.fetchOneItem(req, res, categoryId);

    //~ Guard Clauses
    if (req.user?.role !== 'admin') throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);

    //~ Update Category
    req.body = { ...req.body, id: categoryId };
    await categoryModel.updateItem(req);

    //~ Result
    res.status(200).json(`Category successfully updated !`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

//& -------- deleteCategory
const deleteCategory = async (req: Request, res: Response) => {
  try {
    //~ Is id a number ?
    const categoryId = await coreController.paramsHandler(req, res, 'categoryId');

    //~ Fetch if exist
    await categoryModel.fetchOneItem(req, res, categoryId);

    //~ Guard Clauses
    if (req.user?.role !== 'admin') throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);

    //~ Delete Category
    await categoryModel.deleteItem(categoryId);

    //~ Result
    return res.status(200).json(`Category successfully deleted`);
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { createCategory, fetchAllCategories, updateCategory, deleteCategory };