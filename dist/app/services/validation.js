import { ErrorApi } from "./errorHandler.js";
import debug from 'debug';
const logger = debug('Controller');
const validation = {
    body(schemaCustom) {
        return function (req, res, next) {
            const { error } = schemaCustom.validate(req.body);
            if (error) {
                logger(error);
                throw new ErrorApi('Donnée non valide', req, res, 400);
            }
            next();
        };
    }
};
export { validation };
//# sourceMappingURL=validation.js.map