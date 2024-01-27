import { Router } from 'express';
import type { AppRouter } from '../types';
import { Prisma, type PrismaClient } from '@prisma/client';
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
    this.router.post('', async (request, response, next) => {
      let user: Awaited<object | undefined>;
      try {
        user = await this.prisma?.user.create({
          data: {
            name: request.body.name,
            email: request.body.email,
          },
        });
      } catch (error) {
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
          switch (error.code) {
            case 'P2002':
              response.status(400);
              next();
              return;
            default:
              break;
          }
        }
        next();
        return;
      }

      console.log('user', user);
      response.json({ user });
    });
  }
}

export default UsersRouter;
