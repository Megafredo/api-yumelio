import { CoreModel } from './coreModel.js';
import { Article } from '../datamappers/index.js';

class ArticleModel extends CoreModel {
  //& Properties
  infoNotFound = 'No article found !';
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (item: object) => {
    return Article.create(item);
  };

  itemsFound = (userId: number) => {
    return Article.findAllByUser(userId);
  };

  itemFound = (userId: number, articleId: number) => {
    return Article.findOneByUser(userId, articleId);
  };

  updateOneItem = (item: object) => {
    return Article.update(item);
  };

  deleteOneItem = (articleId: number) => {
    return Article.delete(articleId);
  };
}

const articleModel = new ArticleModel();
export { articleModel };
