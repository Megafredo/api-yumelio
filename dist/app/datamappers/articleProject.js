import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
class ArticleProjectDataMapper extends CoreDataMapper {
    tableName = 'article_project';
    columns = `'id', 'title', 'abstract', 'content', 'order'`;
    createFunctionName = 'create_article_project';
    updateFunctionName = 'update_article_project';
}
const ArticleProject = new ArticleProjectDataMapper(client);
export { ArticleProject };
//# sourceMappingURL=articleProject.js.map