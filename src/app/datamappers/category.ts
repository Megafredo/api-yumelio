//~ Import modules
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
import pg from 'pg';

class CategoryDataMapper extends CoreDataMapper {
  tableName = 'category';
  columns = `'id', 'name', 'logo', 'color`;

  //Functions
  createFunctionName = 'create_category';
  updateFunctionName = 'update_category';
  categoriesArticleFunctionName = 'categories_by_article';
  categoriesProjectFunctionName = 'categories_by_project';

  //& All categories By Article
  async byArticle(articleId: number) {
    if (this.client instanceof pg.Pool) {
    const preparedQuery = {
      text: `SELECT * FROM ${this.categoriesArticleFunctionName}($1);`,
      values: [articleId]
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }  
}

  //& All categories By Project
  async byProject(projectId: number) {
    if (this.client instanceof pg.Pool) {
    const preparedQuery = {
      text: `SELECT * FROM ${this.categoriesProjectFunctionName}($1);`,
      values: [projectId]
    };
    const result = await this.client.query(preparedQuery);
    return result.rows;
  }
}


}

const Category = new CategoryDataMapper(client);

export { Category };
