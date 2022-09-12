//~  IMPORTATIONS EXAMPLES / STATUS CODES
import { articleExample as e, articleProperties as p, articleRequired as r } from '../swaggerExamples/index.js';
import { statusCode } from '../swaggerUtils/swaggerStatus.js';

const articles = {
    //& ---------------------- createArticle
    post: {
        tags: ['Articles'],
        summary: `Creating a article`,
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
                        required: r.createArticle,
                        properties: p.createArticle,
                        example: e.createArticle
                    },
                    description: 'Info body to generate a article'
                }
            }
        },
        responses: {
            201: statusCode._201,
            400: statusCode._400,
            403: statusCode._403,
            404: statusCode._404
        }
    }
};

const articlesByUser = {
    //& ---------------------- fetchAllArticlesByUser
    get: {
        tags: ['Articles'],
        summary: `Retrieving all articles by user id`,
        security: [
          {
              AccessToken: []
          }
        ],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1
            },
            description: `User ID`
          }
        ],
        responses: {
          200: statusCode._200,
          400: statusCode._400,
          403: statusCode._403,
          404: statusCode._404
        }
      },
};

const articleByUser = {
    //& ---------------------- fetchOneArticleByUser
    get: {
        tags: ['Articles'],
        summary: `Retrieval of an article by its Id and the user's id`,
        security: [
          {
              AccessToken: []
          }
        ],
        parameters: [
          {
            name: 'userId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1
            },
            description: `User ID`
          },
          {
            name: 'articleId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1
            },
            description: `Article ID`
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

const article = {
    //& ---------------------- updateArticle
    patch: {
        tags: ['Articles'],
        summary: `Updating an article by his Id`,
        security: [
          {
            AccessToken: []
          }
        ],
        parameters: [
          {
            name: 'articleId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1
            },
            description: `Article ID`
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
                required: r.updateArticle,
                properties: p.updateArticle,
                example: e.updateArticle
              },
              description: 'Info body to update an article'
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
    //& ---------------------- deleteArticle
    delete: {
        tags: ['Articles'],
        summary: `Deleting a article by his Id`,
        security: [
          {
            AccessToken: []
          }
        ],
        parameters: [
          {
            name: 'articleId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1
            },
            description: `Article ID`
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

export { articles, articlesByUser, articleByUser, article };
