//~ Import module
import { ErrorApi } from "../services/errorHandler.js";
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');

//~ Import Ajv
import Ajv from "ajv"
const ajv = new Ajv();
import { Request, Response, NextFunction } from 'express';


function validate(schemaCustom: any) { 
    return function validateCheck(req: Request, res: Response, next: NextFunction) {
        const validate = ajv.compile(schemaCustom);
    
        if (validate(req.body)) {
            next();
        } else {
            logger(validate.errors);
            throw new ErrorApi('Data not valid', req, res,400);
        }
    }
}


export { validate };