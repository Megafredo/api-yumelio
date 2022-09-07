//~  Importations examples
import { infoReturn as i, tableSql } from '../swaggerExamples/userExample.js';

const components = {
  //~ --------------------- Security token
  securitySchemes: {
    // Authorization

    // ApiKeyAuth:  {
    //     type: 'apiKey',
    //     in: 'header',
    //     name: 'X-API-KEY'
    // },

    AccessToken: {
      // Personnalisable
      type: 'apiKey',
      scheme: 'bearer',
      name: 'Authorization', // ne pas oublier d'écrire Bearer au moment du rajout du token
      bearerFormat: 'JWT',
      in: 'header'
    },

    RefreshToken: {
      // Personnalisable
      type: 'apiKey',
      scheme: 'bearer',
      name: 'Authorization', // ne pas oublier d'écrire Bearer au moment du rajout du token
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

        // Article: { properties: tableSql.article },

        // Role: { properties: tableSql.role },

        // Category: { properties: tableSql.category }

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
            OneUser: { properties: i.oneUser },
            // doSignIn
            SignInUser: { properties: i.signInUser }
          }
        },

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
