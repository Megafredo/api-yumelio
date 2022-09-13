import { goldenBookTicketExample as e, goldenBookTicketProperties as p, goldenBookTicketRequired as r } from '../swaggerExamples/index.js';
import { statusCode } from '../swaggerUtils/swaggerStatus.js';
const goldenBookTickets = {
    post: {
        tags: ['GoldenBookTickets'],
        summary: `Creation of a GoldenBookTicket`,
        security: [
            {
                AccessToken: []
            }
        ],
        requestBody: {
            name: 'Body',
            in: 'body',
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        required: r.createGoldenBookTicket,
                        properties: p.createGoldenBookTicket,
                        example: e.createGoldenBookTicket
                    },
                    description: 'Info body to generate a GoldenBookTicket'
                }
            }
        },
        responses: {
            201: statusCode._201,
            400: statusCode._400,
            403: statusCode._403,
            404: statusCode._404
        }
    },
    get: {
        tags: ['GoldenBookTickets'],
        summary: `Retrieving all GoldenBookTickets`,
        security: [
            {
                AccessToken: []
            }
        ],
        responses: {
            200: statusCode._200,
            400: statusCode._400,
            403: statusCode._403,
            404: statusCode._404
        }
    }
};
const goldenBookTicket = {
    patch: {
        tags: ['GoldenBookTickets'],
        summary: `Updating an GoldenBookTicket by his Id`,
        security: [
            {
                AccessToken: []
            }
        ],
        parameters: [
            {
                name: 'gbTicketId',
                in: 'path',
                required: true,
                schema: {
                    type: 'integer',
                    example: 1
                },
                description: `GoldenBookTicket ID`
            }
        ],
        requestBody: {
            name: 'Body',
            in: 'body',
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        required: r.updateGoldenBookTicket,
                        properties: p.updateGoldenBookTicket,
                        example: e.updateGoldenBookTicket
                    },
                    description: 'Info body to update an GoldenBookTicket'
                }
            }
        },
        responses: {
            200: statusCode._200,
            400: statusCode._400,
            403: statusCode._403,
            404: statusCode._404
        }
    },
    delete: {
        tags: ['GoldenBookTickets'],
        summary: `Deleting a GoldenBookTicket by his Id`,
        security: [
            {
                AccessToken: []
            }
        ],
        parameters: [
            {
                name: 'gbTicketId',
                in: 'path',
                required: true,
                schema: {
                    type: 'integer',
                    example: 1
                },
                description: `GoldenBookTicket ID`
            }
        ],
        responses: {
            200: statusCode._200,
            400: statusCode._400,
            403: statusCode._403,
            404: statusCode._404
        }
    }
};
export { goldenBookTickets, goldenBookTicket };
//# sourceMappingURL=goldenBookTicket.js.map