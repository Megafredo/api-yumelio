//~  IMPORTATIONS EXAMPLES / STATUS CODES
import { projectExample as e, projectProperties as p, projectRequired as r } from '../swaggerExamples/index.js';
import { statusCode } from '../swaggerUtils/swaggerStatus.js';

const projects = {
    //& ---------------------- createProject
    post: {
        tags: ['Projects'],
        summary: `Creating a project`,
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
                        required: r.createProject,
                        properties: p.createProject,
                        example: e.createProject
                    },
                    description: 'Info body to generate a project'
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

const projectsByUser = {
    //& ---------------------- fetchAllProjectsByUser
    get: {
        tags: ['Projects'],
        summary: `Retrieving all projects by user id`,
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

const projectByUser = {
    //& ---------------------- fetchOneProjectByUser
    get: {
        tags: ['Projects'],
        summary: `Retrieval of an project by its Id and the user's id`,
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
            name: 'projectId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1
            },
            description: `Project ID`
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

const project = {
    //& ---------------------- updateProject
    patch: {
        tags: ['Projects'],
        summary: `Updating an project by his Id`,
        security: [
          {
            AccessToken: []
          }
        ],
        parameters: [
          {
            name: 'projectId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1
            },
            description: `Project ID`
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
                required: r.updateProject,
                properties: p.updateProject,
                example: e.updateProject
              },
              description: 'Info body to update an project'
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

    //& ---------------------- deleteProject

    delete: {
        tags: ['Projects'],
        summary: `Deleting a project by his Id`,
        security: [
          {
            AccessToken: []
          }
        ],
        parameters: [
          {
            name: 'projectId',
            in: 'path',
            required: true,
            schema: {
              type: 'integer',
              example: 1
            },
            description: `Project ID`
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

export { projects, projectsByUser, projectByUser, project };
