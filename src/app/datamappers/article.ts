//~ Import modules
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class ArticleDataMapper extends CoreDataMapper {
  tableName = 'article';
  columns = `'id', 'title', 'abstract', 'content', 'order'`;

  //Functions
  createFunctionName = 'create_article';
  updateFunctionName = 'update_article';
}

const Article = new ArticleDataMapper(client);

export { Article };
