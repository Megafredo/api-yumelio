import { ErrorApi } from "../services/errorHandler.js";
import debug from 'debug';
const logger = debug('Controller');
import Ajv from "ajv";
const ajv = new Ajv();
function validate(schemaCustom) {
    return function validateCheck(req, res, next) {
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
export { validate };
//# sourceMappingURL=validateSchema.js.map