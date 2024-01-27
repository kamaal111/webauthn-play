import { Prisma, type PrismaClient } from '@prisma/client';
import { type NextFunction, type Response } from 'express';
import { type AppRequest } from '../types';

class UsersController {
  prisma?: PrismaClient;

  create = async (
    request: AppRequest<unknown, unknown, { name?: string; email?: string }>,
    response: Response,
    next: NextFunction
  ) => {
    let user: Awaited<object | undefined>;
    try {
      user = await this.prisma?.user.create({
        data: {
          name: request.body.name,
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          email: request.body.email!,
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

    response.json({ user });
  };

  injectContext = (context: { prisma: PrismaClient }) => {
    this.prisma = context.prisma;
  };
}

export default UsersController;
