import {Router} from 'express';

import type {AppRouter} from '../types';

class HealthRouter implements AppRouter {
  path = '/health';
  router = Router();

  constructor() {
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  private initializeMiddleware() {}

  private initializeRoutes() {
    this.router.get('/ping', (_request, response) =>
      response.json({message: 'pong'})
    );
  }
}

export default HealthRouter;
