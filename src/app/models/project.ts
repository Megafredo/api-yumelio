import { CoreModel } from './coreModel.js';
import { Project } from '../datamappers/index.js';

class ProjectModel extends CoreModel {
  //& Properties
  infoNotFound = 'No project found !';
  infoNoDataFound = 'No data found !';

  //& Methods
  createOneItem = (item: object) => {
    return Project.createWithCategories(item);
  };

  itemsFound = (userId: number) => {
    return Project.findAllProjectsByUserWithCategories(userId);
  };

  itemFound = (userId: number, projectId: number) => {
    return Project.findOneByUser(userId, projectId);
  };

  updateOneItem = (item: object) => {
    return Project.updateWithCategories(item);
  };

  deleteOneItem = (projectId: number) => {
    return Project.delete(projectId);
  };
}

const projectModel = new ProjectModel();
export { projectModel };
