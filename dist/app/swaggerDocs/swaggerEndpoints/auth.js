import { example as e, properties as p, required as r } from '../swaggerExamples/userExample.js';
import { statusCode } from '../swaggerUtils/swaggerStatus.js';
const signup = {
    post: {
        tags: ['Identification'],
        summary: `Creating a user`,
        requestBody: {
            name: 'Body',
            in: 'body',
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        required: r.signUp,
                        properties: p.signUp,
                        example: e.signUp
                    },
                    description: 'Info body to generate a user'
                }
            }
        },
        responses: {
            201: statusCode._201,
            400: statusCode._400,
            401: statusCode._401,
            404: statusCode._404
        }
    }
};
const signin = {
    post: {
        tags: ['Identification'],
        summary: `User authentication`,
        requestBody: {
            name: 'Body',
            in: 'body',
            required: true,
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        required: r.signIn,
                        properties: p.signIn,
                        example: e.signIn
                    },
                    description: 'Info body to login a user'
                }
            }
        },
        responses: {
            200: statusCode._200,
            401: statusCode._401,
            404: statusCode._404
        }
    }
};
const signout = {
    get: {
        tags: ['Identification'],
        summary: `User logout`,
        security: [
            {
                RefreshToken: []
            }
        ],
        responses: {
            204: statusCode._204,
            400: statusCode._400,
            404: statusCode._404
        }
    }
};
const refreshToken = {
    post: {
        tags: ['Identification'],
        summary: `Updating a user's token`,
        security: [
            {
                RefreshToken: []
            }
        ],
        responses: {
            201: statusCode._201,
            400: statusCode._400,
            401: statusCode._401,
            403: statusCode._403,
            404: statusCode._404
        }
    }
};
export { signup, signin, signout, refreshToken };
//# sourceMappingURL=auth.js.map