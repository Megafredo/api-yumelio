import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
import pg from 'pg';
class CategoryDataMapper extends CoreDataMapper {
    tableName = 'category';
    columns = `'id', 'name', 'logo', 'color`;
    createFunctionName = 'create_category';
    updateFunctionName = 'update_category';
    categoriesArticleFunctionName = 'categories_by_article';
    categoriesProjectFunctionName = 'categories_by_project';
    async byArticle(articleId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM ${this.categoriesArticleFunctionName}($1);`,
                values: [articleId]
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
    async byProject(projectId) {
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
//# sourceMappingURL=category.js.map