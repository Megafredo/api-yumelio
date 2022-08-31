//~ MISE EN PLACE DE SWAGGER POUR LA DOC
import swagger from 'swagger-jsdoc';
const swaggerJSDoc = swagger;
import { serve, setup } from 'swagger-ui-express';

import { swaggerDarkCss } from './swaggerUtils/swaggerDark.js';
import { components } from './swaggerUtils/swaggerComponents.js';

//articles
// import { articles, oneArticle, articlesByCategory, articlesByUser, lastestArticles, searchAllArticles } from './swaggerEndpoints/article.js';
// import { articleComments, articlesCommentsById, articlesCommentsByUser } from './swaggerEndpoints/articleComment.js';


//users
// import { users, oneUser } from './swaggerEndpoints/user.js';

const options = {
  definition: {
    // Les informations principales
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Yumelio API',
      description: `
      Bienvenue sur notre documentation faite grâce à Swagger pour notre Yumelio API.
      Vous trouverez ici tous les endpoints qui permettront la visualisation des données.
      Nous avons mis en place un système d'identification par les tokens afin de visualiser les routes nécessitant une identification.
      
      Cette API a été faite avec passion, amusez-vous bien :)`,
      license: {
        name: 'MIT'
      }
    },

    // Les liens extérieurs
    externalDocs: {
      description: 'Yumicode & Megafredo',
      url: 'http://WorkHard_DreamBig_NeverGiveUp/'
    },

    // Tous les serveurs
    servers: [
      {
        url: 'http://localhost:4100/api/v1',
        description: 'API localhost v1'
      }
    ],

    // Tous les chemins ( GET / POST / PATCH / DELETE )
    paths: {
    //   //~ AUTH
    //   '/signup': signup,
    //   '/signin': signin,
    //   '/signout': signout,
    //   '/refreshToken': refreshToken,


    //   //~ USERS
    //   '/users': users,
    //   '/users/{userId}': oneUser,


    //   //~ ARTICLES
    //   '/articles': articles,
    //   '/articles/{articleId}': oneArticle,

    //   '/categories/{categoryId}/articles': articlesByCategory,
    //   '/users/{userId}/articles': articlesByUser,
    //   '/articles/last': lastestArticles,
    //   '/articles/search': searchAllArticles,





  

    },
    // Tous les schemas
    components

    // security:{
    //     ApiKeyAuth:[]
    // }
  },

  apis: ['./src/app/routes/*.js']
  // Equivalent à
  // apis: ['./*/*/*.js']
};

const specs = swaggerJSDoc(options);

const cssOptions = {
  customCss: swaggerDarkCss,
  customSiteTitle: 'Yumelio API'
};

export { specs, serve, setup, cssOptions };