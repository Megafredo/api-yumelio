import { ErrorApi } from '../services/errorHandler.js';
import { Request, Response } from 'express';

interface CoreModel {
  //& CRUD Functions
  createOneItem: Function;
  itemFound: Function;
  itemsFound: Function;
  updateOneItem: Function;
  deleteOneItem: Function;

  //& Messages
  infoNotFound: string;
  infoEmail: string;
  infoEmailNotFound: string;
  infoNoDataFound: string;

  //& Functions
  emailExist: Function;
  userFound: Function;
}

class CoreModel {
  //& CRUD
  createItem = async (req: Request, res: Response): Promise<string[]> => {
    const result = await this.createOneItem(req.body);
    if (!result) throw new ErrorApi(this.infoNoDataFound, req, res, 400);
    return result;
  };

  fetchAllItems = async (req: Request, res: Response, id?: number): Promise<string[]> => {
    const result = await this.itemsFound(id);
    if (!result) throw new ErrorApi(this.infoNotFound, req, res, 400);
    return result;
  };

  fetchOneItem = async (req: Request, res: Response, id: number | undefined, secondId?: number): Promise<string[]> => {
    const result = await this.itemFound(id, secondId);
    if (!result) throw new ErrorApi(this.infoNotFound, req, res, 400);
    return result;
  };

  updateItem = async (req: Request): Promise<string[]> => {
    const result = await this.updateOneItem(req.body);
    return result;
  };

  deleteItem = async (id: number | undefined): Promise<string[]> => {
    const result = await this.deleteOneItem(id);
    return result;
  };

  //& Check & Fetch
  checkEmail = async (req: Request, res: Response, email: string): Promise<void> => {
    const result = await this.emailExist(email);
    if (result) throw new ErrorApi(this.infoEmail, req, res, 401);
  };

  fetchEmail = async (req: Request, res: Response, email: string): Promise<any> => {
    const result = await this.emailExist(email);
    if (!result) throw new ErrorApi(this.infoEmailNotFound, req, res, 400);
    return result;
  };

  fetchUser = async (req: Request, res: Response, id: number | undefined): Promise<any> => {
    const result = await this.userFound(id);
    if (!result) throw new ErrorApi(this.infoNotFound, req, res, 400);
    return result;
  };
}

export { CoreModel };