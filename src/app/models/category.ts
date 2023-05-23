import { CoreModel } from './coreModel.js';
import { Category } from '../datamappers/index.js';

class CategoryModel extends CoreModel {
  //& Properties
  infoNotFound = `Category doesn't exist`;
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (item: object) => {
    return Category.create(item);
  };

  itemsFound = () => {
    return Category.findAll();
  };

  itemFound = (categoryId: number) => {
    return Category.findOne(categoryId);
  };

  updateOneItem = (item: object) => {
    return Category.update(item);
  };

  deleteOneItem = (categoryId: number) => {
    return Category.delete(categoryId);
  };
}

const categoryModel = new CategoryModel();
export { categoryModel };
