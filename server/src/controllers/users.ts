import { Prisma, type PrismaClient, type User } from '@prisma/client';
import { type NextFunction, type Response } from 'express';
import { type AppRequest } from '../types';
import { z } from 'zod';

const UserPayload = z.object({
  name: z.string().optional(),
  email: z.string(),
});

class UsersController {
  prisma?: PrismaClient;

  create = async (
    request: AppRequest<unknown, unknown, { name?: string; email?: string }>,
    response: Response,
    next: NextFunction
  ) => {
    let userPayload: z.infer<typeof UserPayload>;
    try {
      userPayload = UserPayload.parse(request.body);
    } catch (error) {
      response.status(400);
      next();
      return;
    }

    let user: Awaited<User | undefined>;
    try {
      user = await this.prisma?.user.create({ data: userPayload });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002':
            response.status(409);
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
