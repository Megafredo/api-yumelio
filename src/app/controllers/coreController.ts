import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';

interface CoreController {}

class CoreController {
  //& ParamsHandler
  paramsHandler = async (req: Request, res: Response, elementId: string) => {
    const idVerified = +req.params[elementId];
    if (isNaN(idVerified)) throw new ErrorApi(`Id must be a number`, req, res, 400);
    return idVerified;
  };
}

const coreController = new CoreController();
export { coreController };
