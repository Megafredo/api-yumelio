import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
class GoldenBookTicketDataMapper extends CoreDataMapper {
    tableName = 'gb_ticket';
    columns = `'id', 'content', 'created_at'`;
    createFunctionName = 'create_gb_ticket';
    updateFunctionName = 'update_gb_ticket';
}
const GoldenBookTicket = new GoldenBookTicketDataMapper(client);
export { GoldenBookTicket };
//# sourceMappingURL=GoldenBookTicket.js.map