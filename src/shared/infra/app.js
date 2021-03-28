import express from 'express';
import 'express-async-errors';
import cors from 'cors';

import AppError from '../errors/AppError';

import routes from './routes';

import './database';

class App {
   constructor() {
      this.server = express();

      this.middlewares();
      this.routes();
      this.exceptionHandler();
   }

   middlewares() {
      this.server.use(
         cors({
            exposedHeaders: ['Content-Disposition'],
         }),
      );
      this.server.use(express.json());
   }

   routes() {
      this.server.use(routes);
   }

   exceptionHandler() {
      this.server.use((err, req, res, next) => {
         if (err instanceof AppError) {
            return res.status(err.statusCode).json({ status: 'error', error: err.message });
         }

         console.error(err);
         return res.status(500).json({ status: 'error', message: 'internal server error!' });
      });
   }
}

export default new App().server;
