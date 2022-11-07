import { GoldenBookTicket } from '../datamappers/index.js';
import { CoreModel } from './coreModel.js';
class GoldenBookModel extends CoreModel {
    infoNotFound = 'No ticket found !';
    infoNoDataFound = 'No data found !';
    createOneItem = (item) => {
        return GoldenBookTicket.create(item);
    };
    itemsFound = () => {
        return GoldenBookTicket.findAll();
    };
    itemFound = (userId, articleId) => {
        return GoldenBookTicket.findOneByUser(userId, articleId);
    };
    updateOneItem = (item) => {
        return GoldenBookTicket.update(item);
    };
    deleteOneItem = (articleId) => {
        return GoldenBookTicket.delete(articleId);
    };
}
const goldenBookModel = new GoldenBookModel();
export { goldenBookModel };
//# sourceMappingURL=goldenBook.js.map