import { GoldenBookTicket } from '../datamappers/index.js';
import { CoreModel } from './coreModel.js';

class GoldenBookModel extends CoreModel {
  //& Properties
  infoNotFound = 'No ticket found !';
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (item: object) => {
    return GoldenBookTicket.create(item);
  };

  itemsFound = () => {
    return GoldenBookTicket.findAll();
  };

  itemFound = (userId: number, articleId: number) => {
    return GoldenBookTicket.findOneByUser(userId, articleId);
  };

  updateOneItem = (item: object) => {
    return GoldenBookTicket.update(item);
  };

  deleteOneItem = (articleId: number) => {
    return GoldenBookTicket.delete(articleId);
  };
}

const goldenBookModel = new GoldenBookModel();
export { goldenBookModel };
