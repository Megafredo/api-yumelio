import { ErrorApi } from '../services/errorHandler.js';
import { baseConvertSvg } from '../utils/baseConvertSvg.js';
import { coreController } from './coreController.js';
import debug from 'debug';
const logger = debug('Controller');
import { categoryModel } from '../models/index.js';
const createCategory = async (req, res) => {
    try {
        if (req.user?.role !== 'admin')
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        await categoryModel.createItem(req, res);
        return res.status(201).json('Category successfully created !');
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const fetchAllCategories = async (req, res) => {
    try {
        const categories = await categoryModel.fetchAllItems(req, res);
        const result = baseConvertSvg(categories);
        return res.status(200).json(result);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const updateCategory = async (req, res) => {
    try {
        const categoryId = await coreController.paramsHandler(req, res, 'categoryId');
        await categoryModel.fetchOneItem(req, res, categoryId);
        if (req.user?.role !== 'admin')
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        req.body = { ...req.body, id: categoryId };
        await categoryModel.updateItem(req);
        res.status(200).json(`Category successfully updated !`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
const deleteCategory = async (req, res) => {
    try {
        const categoryId = await coreController.paramsHandler(req, res, 'categoryId');
        await categoryModel.fetchOneItem(req, res, categoryId);
        if (req.user?.role !== 'admin')
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
        await categoryModel.deleteItem(categoryId);
        return res.status(200).json(`Category successfully deleted`);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { createCategory, fetchAllCategories, updateCategory, deleteCategory };
//# sourceMappingURL=categoryController.js.map