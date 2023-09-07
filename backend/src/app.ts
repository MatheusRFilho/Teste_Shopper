import 'reflect-metadata';
import express, { Request, Response } from 'express';
import 'express-async-errors';
import { Routes } from './routes';
import { AppError } from './errors/AppError';

import cors from 'cors';
const app = express();

app.use(cors());

app.use(express.json());
app.use(Routes);

app.use(
  (err: Error, request: Request, response: Response) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }
    return response.status(500).json({
      stattus: 'Error',
      message: `Internal server error ${err.message}`,
    });
  },
);

export { app };