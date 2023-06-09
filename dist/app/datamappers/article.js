import pg from 'pg';
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
class ArticleDataMapper extends CoreDataMapper {
    tableName = 'article';
    columns = `"id", "title", "abstract", "content", "order"`;
    createFunctionName = 'create_article';
    updateFunctionName = 'update_article';
    articlesByUser = 'articles_by_user';
    articleByUser = 'article_by_user';
    async findAllByUser(userId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM "${this.articlesByUser}"($1);`,
                values: [userId]
            };
            const result = await this.client.query(preparedQuery);
            if (!result.rows[0])
                return null;
            return result.rows;
        }
    }
    async findOneByUser(userId, articleId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM "${this.articleByUser}"($1, $2);`,
                values: [userId, articleId]
            };
            const result = await this.client.query(preparedQuery);
            if (!result.rows[0])
                return null;
            return result.rows[0];
        }
    }
}
const Article = new ArticleDataMapper(client);
export { Article };
//# sourceMappingURL=article.js.map