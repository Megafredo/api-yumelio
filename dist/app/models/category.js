import { CoreModel } from './coreModel.js';
import { Category } from '../datamappers/index.js';
class CategoryModel extends CoreModel {
    infoNotFound = `Category doesn't exist`;
    infoNoDataFound = 'No data found !';
    createOneItem = (item) => {
        return Category.create(item);
    };
    itemsFound = () => {
        return Category.findAll();
    };
    itemFound = (categoryId) => {
        return Category.findOne(categoryId);
    };
    updateOneItem = (item) => {
        return Category.update(item);
    };
    deleteOneItem = (categoryId) => {
        return Category.delete(categoryId);
    };
}
const categoryModel = new CategoryModel();
export { categoryModel };
//# sourceMappingURL=category.js.map