//~ Import module
import { ErrorApi } from './errorHandler.js';
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
import Ajv, { JTDDataType } from 'ajv/dist/jtd.js';
const ajv = new Ajv();

import { Request, Response, NextFunction } from 'express';

//~ Validation schema
const validation = {
  /**
     * 
     * @func schemaCustom
     * @description get the schema from AJV
     * @returns 
     */
  body(schemaCustom: any) {
    //valid req.body format
    return function(req: Request, res: Response, next: NextFunction) {
      const validate = ajv.compile(schemaCustom);

      if (validate(req.body)) {
        next();
      } else {
        logger(validate.errors);
        throw new ErrorApi('Data not valid', req, res, 400);
      }
    };
  }
};

export { validation };
