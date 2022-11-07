import pg from 'pg';
import client from '../db/database.js';
import { CoreDataMapper } from './coreDataMapper.js';
class GoldenBookTicketDataMapper extends CoreDataMapper {
    tableName = 'gb_ticket';
    columns = `"id", "content", "created_at", "user_id"`;
    createFunctionName = 'create_gb_ticket';
    updateFunctionName = 'update_gb_ticket';
    goldenBookTicketByUser = 'gb_ticket_by_user';
    async findOneByUser(userId, goldenBookTicketByUserId) {
        if (this.client instanceof pg.Pool) {
            const preparedQuery = {
                text: `SELECT * FROM "${this.goldenBookTicketByUser}"($1, $2);`,
                values: [userId, goldenBookTicketByUserId]
            };
            const result = await this.client.query(preparedQuery);
            if (!result.rows[0])
                return null;
            return result.rows;
        }
    }
}
const GoldenBookTicket = new GoldenBookTicketDataMapper(client);
export { GoldenBookTicket };
//# sourceMappingURL=GoldenBookTicket.js.map