import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
class ProjectDataMapper extends CoreDataMapper {
    tableName = 'project';
    columns = `'id', 'title', 'abstract', 'content', 'picture', 'is_active', 'date', 'link'`;
    createFunctionName = 'create_project';
    updateFunctionName = 'update_project';
}
const Project = new ProjectDataMapper(client);
export { Project };
//# sourceMappingURL=project.js.map