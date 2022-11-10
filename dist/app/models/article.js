import { CoreModel } from './coreModel.js';
import { Article } from '../datamappers/index.js';
class ArticleModel extends CoreModel {
    infoNotFound = 'No article found !';
    infoNoDataFound = 'No data found !';
    createOneItem = (item) => {
        return Article.create(item);
    };
    itemsFound = (userId) => {
        return Article.findAllByUser(userId);
    };
    itemFound = (userId, articleId) => {
        return Article.findOneByUser(userId, articleId);
    };
    updateOneItem = (item) => {
        return Article.update(item);
    };
    deleteOneItem = (articleId) => {
        return Article.delete(articleId);
    };
}
const articleModel = new ArticleModel();
export { articleModel };
//# sourceMappingURL=article.js.map