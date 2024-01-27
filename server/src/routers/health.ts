import { Router } from 'express';

import type { AppRouter } from '../types';
import type { PrismaClient } from '@prisma/client';

class HealthRouter implements AppRouter {
  path = '/health';
  router = Router();

  constructor() {
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  injectContext = (_: { prisma: PrismaClient }) => {};

  private initializeMiddleware() {}

  private initializeRoutes() {
    this.router.get('/ping', (_request, response) =>
      response.json({ message: 'pong' })
    );
  }
}

export default HealthRouter;
