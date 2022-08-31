//~ Import module
import { ErrorApi } from "./errorHandler.js";
//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');

import { Request, Response, NextFunction } from 'express';

//~ Validation schema
const validation = {
    /**
     * 
     * @func schemaCustom
     * @description On récupère le schéma établi avec le module Joi pour la validation du body 
     * @returns 
     */
    body(schemaCustom:any) {
      //valid req.body format
      return function(req:Request, res:Response, next:NextFunction) {
        const { error } = schemaCustom.validate(req.body);
        if (error) {
          logger(error);
          throw new ErrorApi('Donnée non valide', req, res,400);
        }
  
        next();
      };
    }
  };
  
  export { validation };