import { ErrorApi } from "../services/errorHandler.js";
import debug from 'debug';
const logger = debug('Controller');
import Ajv from "ajv";
const ajv = new Ajv();
import { userSchema } from '../schema/example.schema.js';
function validate(req, res, next) {
    const validate = ajv.compile(userSchema);
    if (validate(req.body)) {
        console.log("OK ---------------------------");
    }
    else {
        console.log("ERROR ---------------------------", validate.errors);
    }
}
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
//# sourceMappingURL=testSchema.js.map