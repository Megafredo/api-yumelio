import { ErrorApi } from '../services/errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import { Category } from '../datamappers/index.js';
async function createCategory(req, res) {
    try {
        if (req.user?.role === 'admin') {
            const categoryCreated = await Category.create(req.body);
            if (!categoryCreated)
                throw new ErrorApi(`No data found !`, req, res, 400);
            return res.status(201).json('Category successfully created !');
        }
        else
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function fetchAllCategories(req, res) {
    try {
        const articles = await Category.findAll();
        if (!articles)
            throw new ErrorApi(`No category found !`, req, res, 400);
        return res.status(200).json(articles);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function updateCategory(req, res) {
    try {
        const categoryId = +req.params.categoryId;
        if (isNaN(categoryId))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        const oneCategory = await Category.findOne(categoryId);
        if (!oneCategory)
            throw new ErrorApi(`Category doesn't exist`, req, res, 400);
        if (req.user?.role === 'admin') {
            req.body = { ...req.body, id: categoryId };
            await Category.update(req.body);
            res.status(200).json(`Category successfully updated !`);
        }
        else
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
async function deleteCategory(req, res) {
    try {
        const categoryId = +req.params.categoryId;
        if (isNaN(categoryId))
            throw new ErrorApi(`Id must be a number`, req, res, 400);
        const oneCategory = await Category.findOne(categoryId);
        if (!oneCategory)
            throw new ErrorApi(`Category doesn't exist`, req, res, 400);
        if (req.user?.role === 'admin') {
            await Category.delete(categoryId);
            return res.status(200).json(`Category successfully deleted`);
        }
        else
            throw new ErrorApi(`You cannot access this info, go away !`, req, res, 400);
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
}
export { createCategory, fetchAllCategories, updateCategory, deleteCategory };
//# sourceMappingURL=categoryController.js.map