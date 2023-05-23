import { ErrorApi } from './errorHandler.js';
import debug from 'debug';
const logger = debug('Controller');
import Ajv from 'ajv/dist/jtd.js';
const ajv = new Ajv();
const validation = {
    body(schemaCustom) {
        return function (req, res, next) {
            const validate = ajv.compile(schemaCustom);
            if (validate(req.body)) {
                next();
            }
            else {
                logger(validate.errors);
                throw new ErrorApi('Data not valid', req, res, 400);
            }
        };
    }
};
export { validation };
//# sourceMappingURL=validation.js.map