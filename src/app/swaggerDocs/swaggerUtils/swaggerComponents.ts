//~  Importations examples
import { userInfoReturn, articleInfoReturn, tableSql } from '../swaggerExamples/index.js';

const components = {
    //~ --------------------- Security token
    securitySchemes: {
        // Authorization

        // ApiKeyAuth: {
        //     // description: 'API key to authorize requests.',
        //     type: 'apiKey',
        //     in: 'query',
        //     name: 'X-API-Key'
        // },

        AccessToken: {
            // Personnalisable
            type: 'http',
            scheme: 'Bearer',
            name: 'Authorization',
            bearerFormat: 'JWT',
            in: 'header'
        },

        RefreshToken: {
            // Personnalisable
            type: 'http',
            scheme: 'Bearer',
            name: 'Authorization',
            bearerFormat: 'JWT',
            in: 'header'
        }
    },

    //~ --------------------- All Schemas
    schemas: {
        //& -------------------- TABLES_SQL
        TABLES_SQL: {
            type: 'object',
            properties: {
                User: { properties: tableSql.user },

                Article: { properties: tableSql.article },

                Role: { properties: tableSql.role },

                Project: { properties: tableSql.project },

                Gb_Ticket: { properties: tableSql.gbTicket },

                Category: { properties: tableSql.category },

                Project_has_category: { properties: tableSql.project_has_category },

                Article_has_category: { properties: tableSql.article_has_category }
            }
        },

        //* -------------------- INFO_RETURN
        INFO_RETURN: {
            type: 'object',
            properties: {
                //* ------------------
                User: {
                    type: 'object',
                    properties: {
                        // fetchOneUser
                        fetchOneUser: { properties: userInfoReturn.fetchOneUser },
                        // doSignIn
                        SignInUser: { properties: userInfoReturn.signInUser }
                    }
                },

                //* ------------------
                Article: {
                    type: 'object',
                    properties: {
                        // fetchAllArticlesByUser
                        articlesByUser: { properties: articleInfoReturn.articlesByUser },
                        // fetchOneArticleByUser
                        articleByUser: { properties: articleInfoReturn.articleByUser }
                    }
                }
            }
        },

        //& Class ErrorHandler
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
