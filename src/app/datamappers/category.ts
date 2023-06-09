//~ Import modules
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class CategoryDataMapper extends CoreDataMapper {
  tableName = 'category';
  columns = `"id", "name", "logo", "color"`;

  //Functions
  createFunctionName = 'create_category';
  updateFunctionName = 'update_category';
}

const Category = new CategoryDataMapper(client);

export { Category };
