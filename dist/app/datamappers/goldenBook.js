import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
class GoldenBookDataMapper extends CoreDataMapper {
    tableName = 'golden_book';
    columns = `'id', 'content', 'created_at'`;
    createFunctionName = 'create_golden_book';
    updateFunctionName = 'update_golden_book';
}
const GoldenBook = new GoldenBookDataMapper(client);
export { GoldenBook };
//# sourceMappingURL=goldenBook.js.map