import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
import pg from 'pg';
class ProjectDataMapper extends CoreDataMapper {
    tableName = 'project';
    columns = `"id", "title", "abstract", "content", "picture", "is_active", "date",'"link"`;
    createFunctionName = 'create_project';
    updateFunctionName = 'update_project';
    allProjectsWithCategories = 'projects_with_categories';
    async fetchAllProjectsWithCategories() {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM ${this.allProjectsWithCategories};`
            };
            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }
}
const Project = new ProjectDataMapper(client);
export { Project };
//# sourceMappingURL=project.js.map