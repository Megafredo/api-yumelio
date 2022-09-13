import { userInfoReturn, articleInfoReturn, projectInfoReturn, categoryInfoReturn, goldenBookTicketInfoReturn, tableSql } from '../swaggerExamples/index.js';
const components = {
    securitySchemes: {
        AccessToken: {
            type: 'http',
            scheme: 'Bearer',
            name: 'Authorization',
            bearerFormat: 'JWT',
            in: 'header'
        },
        RefreshToken: {
            type: 'http',
            scheme: 'Bearer',
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
                Article: { properties: tableSql.article },
                Role: { properties: tableSql.role },
                Project: { properties: tableSql.project },
                Gb_Ticket: { properties: tableSql.gbTicket },
                Category: { properties: tableSql.category },
                Project_has_category: { properties: tableSql.project_has_category },
                Article_has_category: { properties: tableSql.article_has_category }
            }
        },
        INFO_RETURN: {
            type: 'object',
            properties: {
                User: {
                    type: 'object',
                    properties: {
                        fetchOneUser: { properties: userInfoReturn.fetchOneUser },
                        SignInUser: { properties: userInfoReturn.signInUser }
                    }
                },
                Article: {
                    type: 'object',
                    properties: {
                        articlesByUser: { properties: articleInfoReturn.articlesByUser },
                        articleByUser: { properties: articleInfoReturn.articleByUser }
                    }
                },
                Project: {
                    type: 'object',
                    properties: {
                        projectsByUser: { properties: projectInfoReturn.projectsByUser },
                        projectByUser: { properties: projectInfoReturn.projectByUser }
                    }
                },
                Category: {
                    type: 'object',
                    properties: {
                        allCategories: { properties: categoryInfoReturn.allCategories }
                    }
                },
                GoldenBookTicket: {
                    type: 'object',
                    properties: {
                        allGoldenBookTickets: { properties: goldenBookTicketInfoReturn.allGoldenBookTickets }
                    }
                }
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