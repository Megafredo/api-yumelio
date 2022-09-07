import swagger from 'swagger-jsdoc';
const swaggerJSDoc = swagger;
import { serve, setup } from 'swagger-ui-express';
import { swaggerDarkCss } from './swaggerUtils/swaggerDark.js';
import { components } from './swaggerUtils/swaggerComponents.js';
import { signup, signin, signout, refreshToken, oneUser } from './swaggerEndpoints/user.js';
const options = {
    definition: {
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
        externalDocs: {
            description: 'Yumicode & Megafredo',
            url: 'http://WorkHard_DreamBig_NeverGiveUp/'
        },
        servers: [
            {
                url: 'http://localhost:4100/api/v1',
                description: 'API localhost v1'
            }
        ],
        paths: {
            '/signup': signup,
            '/signin': signin,
            '/signout': signout,
            '/refreshToken': refreshToken,
            '/users/{userId}': oneUser,
        },
        components
    },
    apis: ['./src/app/routes/*.js']
};
const specs = swaggerJSDoc(options);
const cssOptions = {
    customCss: swaggerDarkCss,
    customSiteTitle: 'Yumelio API'
};
export { specs, serve, setup, cssOptions };
//# sourceMappingURL=swaggerDocs.js.map