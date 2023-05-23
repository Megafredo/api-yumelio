import { CoreModel } from './coreModel.js';
import { Project } from '../datamappers/index.js';
class ProjectModel extends CoreModel {
    infoNotFound = 'No project found !';
    infoNoDataFound = 'No data found !';
    createOneItem = (item) => {
        return Project.createWithCategories(item);
    };
    itemsFound = (userId) => {
        return Project.findAllProjectsByUserWithCategories(userId);
    };
    itemFound = (userId, projectId) => {
        return Project.findOneByUser(userId, projectId);
    };
    updateOneItem = (item) => {
        return Project.updateWithCategories(item);
    };
    deleteOneItem = (projectId) => {
        return Project.delete(projectId);
    };
}
const projectModel = new ProjectModel();
export { projectModel };
//# sourceMappingURL=project.js.map