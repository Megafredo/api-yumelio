//~ Import Debug
import debug from 'debug';
const logger = debug('Controller');
import { Request, Response } from 'express';

//~ -------- Controller
//& -------- renderHomePage
const renderHomePage = (req: Request, res: Response) => {
  try {
    res.json({
      message: 'Welcome to Yumelio API',
    });
  } catch (err) {
    if (err instanceof Error) logger(err.message);
  }
};

export { renderHomePage };
