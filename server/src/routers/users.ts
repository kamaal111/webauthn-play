import { Router } from 'express';
import type { AppRouter } from '../types';
import { type PrismaClient } from '@prisma/client';
import UsersController from '../controllers/users';

class UsersRouter implements AppRouter {
  path = '/users';
  router = Router();
  controller = new UsersController();

  constructor() {
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  injectRouteContext = (context: { prisma: PrismaClient }) => {
    this.controller.injectRouteContext(context);
  };

  private initializeMiddleware() {}

  private initializeRoutes() {
    this.router.post('', this.controller.create);
  }
}

export default UsersRouter;
