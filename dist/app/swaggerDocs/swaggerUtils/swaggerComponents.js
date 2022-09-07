import { infoReturn as i, tableSql } from '../swaggerExamples/userExample.js';
const components = {
    securitySchemes: {
        AccessToken: {
            type: 'apiKey',
            scheme: 'bearer',
            name: 'Authorization',
            bearerFormat: 'JWT',
            in: 'header'
        },
        RefreshToken: {
            type: 'apiKey',
            scheme: 'bearer',
            name: 'Authorization',
            bearerFormat: 'JWT',
            in: 'header'
        }
    },
    schemas: {
        TABLES_SQL: {
            type: 'object',
            properties: {
                User: { properties: tableSql.user },
            }
        },
        INFO_RETURN: {
            type: 'object',
            properties: {
                User: {
                    type: 'object',
                    properties: {
                        OneUser: { properties: i.oneUser },
                        SignInUser: { properties: i.signInUser }
                    }
                },
            }
        },
        StatusCode_Errors: {
            type: 'object',
            properties: {
                message: {
                    type: 'string'
                },
                code: {
                    type: 'integer'
                }
            }
        }
    }
};
export { components };
//# sourceMappingURL=swaggerComponents.js.map