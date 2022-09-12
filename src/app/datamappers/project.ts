//~ Import modules
import pg from 'pg';
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class ProjectDataMapper extends CoreDataMapper {
    tableName = 'project';
    columns = `"id", "title", "abstract", "content", "picture", "is_active", "date",'"link"`;

    //Functions
    createFunctionName = 'create_project';
    updateFunctionName = 'update_project';
    projectsByUser = 'projects_by_user';
    projectByUser = 'project_by_user';
    createWithCategoriesFunctionName = 'add_category_to_project';
    updateWithCategoriesFunctionName = 'update_project_with_categories';

    //& Find one article by user
    async findOneByUser(userId: number | undefined, projectId: number | undefined) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM "${this.projectByUser}"($1, $2);`,
                values: [userId, projectId]
            };

            const result = await this.client.query(preparedQuery);
            if (!result.rows[0]) return null;
            return result.rows[0];
        }
    }

    //& All Projects With Categories
    async findAllProjectsByUserWithCategories(userId: number | undefined) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM ${this.projectsByUser}($1);`,
                values: [userId]
            };

            const result = await this.client.query(preparedQuery);
            return result.rows;
        }
    }

    //& CreateWithCategories
    async createWithCategories(inputData: object) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM ${this.createWithCategoriesFunctionName}($1);`,
                values: [inputData]
            };

            const result = await this.client.query(preparedQuery);
            return result.rows[0];
        }
    }

    //& updateWithCategories
    async updateWithCategories(inputData: object) {
      if (this.client instanceof pg.Pool) {
          const preparedQuery = {
              text: `SELECT * FROM ${this.updateWithCategoriesFunctionName}($1);`,
              values: [inputData]
          };

          const result = await this.client.query(preparedQuery);
          return result.rows[0];
      }
  }
}

const Project = new ProjectDataMapper(client);

export { Project };
