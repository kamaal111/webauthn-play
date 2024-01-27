import { Router } from 'express';
import type { AppRouter } from '../types';
import { type PrismaClient } from '@prisma/client';
import UsersController from '../controllers/users';

class UsersRouter implements AppRouter {
  path = '/users';
  router = Router();
  controller = new UsersController();
  prisma?: PrismaClient;

  constructor() {
    this.initializeMiddleware();
    this.initializeRoutes();
  }

  injectContext = (context: { prisma: PrismaClient }) => {
    this.prisma = context.prisma;
    this.controller.injectContext(context);
  };

  private initializeMiddleware() {}

  private initializeRoutes() {
    this.router.post('', this.controller.create);
  }
}

export default UsersRouter;
