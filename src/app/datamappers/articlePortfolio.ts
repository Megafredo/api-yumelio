//~ Import modules
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class ArticlePortfolioDataMapper extends CoreDataMapper {
  tableName = 'article_portfolio';
  columns = `'id', 'title', 'abstract', 'content', 'picture', 'is_active', 'date', 'link'`;

  //Functions
  createFunctionName = 'create_article_portfolio';
  updateFunctionName = 'update_article_portfolio';
}

const ArticlePortfolio = new ArticlePortfolioDataMapper(client);

export { ArticlePortfolio };
