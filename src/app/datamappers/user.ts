//~ Import modules
import pg from 'pg';
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';

class UserDataMapper extends CoreDataMapper {
  tableName = 'user';
  columns = ` "id", "first_name", "last_name", "email", "password", "linkedin_url", "github_url", "instagram_url"`;

  //Functions
  createFunctionName = 'create_user';
  updateFunctionName = 'update_user';
  userIdentity = 'user_identity';

  //& Find user by email
  async findUserIdentity(email: string) {
    if (this.client instanceof pg.Pool) {
      const preparedQuery = {
        text: `
                SELECT * FROM "${this.userIdentity}"($1);
                `,
        values: [email]
      };

      const result = await this.client.query(preparedQuery);
      if (!result.rows[0]) return null;
      return result.rows[0];
    }
  }
}

const User = new UserDataMapper(client);
export { User };
