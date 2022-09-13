import { categoryExample as e, categoryProperties as p, categoryRequired as r } from '../swaggerExamples/index.js';
import { statusCode } from '../swaggerUtils/swaggerStatus.js';
const categories = {
    post: {
        tags: ['Categories'],
        summary: `Creation of a category`,
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
                        required: r.createCategory,
                        properties: p.createCategory,
                        example: e.createCategory
                    },
                    description: 'Info body to generate a category'
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
        tags: ['Categories'],
        summary: `Retrieving all categories`,
        responses: {
            200: statusCode._200,
            400: statusCode._400,
            403: statusCode._403,
            404: statusCode._404
        }
    }
};
const category = {
    patch: {
        tags: ['Categories'],
        summary: `Updating an category by his Id`,
        security: [
            {
                AccessToken: []
            }
        ],
        parameters: [
            {
                name: 'categoryId',
                in: 'path',
                required: true,
                schema: {
                    type: 'integer',
                    example: 1
                },
                description: `Category ID`
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
                        required: r.updateCategory,
                        properties: p.updateCategory,
                        example: e.updateCategory
                    },
                    description: 'Info body to update an category'
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
        tags: ['Categories'],
        summary: `Deleting a category by his Id`,
        security: [
            {
                AccessToken: []
            }
        ],
        parameters: [
            {
                name: 'categoryId',
                in: 'path',
                required: true,
                schema: {
                    type: 'integer',
                    example: 1
                },
                description: `Category ID`
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
export { categories, category };
//# sourceMappingURL=category.js.map