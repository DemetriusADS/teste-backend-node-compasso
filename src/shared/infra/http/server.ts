import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';

import routes from './routes';
import AppError from '../errors/AppError';

import '../typeorm/';

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.status).json({
        status: 'error',
        message: err.message,
      });
    }
    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  }
);

app.listen(3333, () => {
  console.log('😆 Server stated on port 3333!');
});
