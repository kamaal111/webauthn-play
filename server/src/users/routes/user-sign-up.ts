import { Prisma, type PrismaClient, type User } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { UserPayload } from 'shared-validator/src/users';

import { publicProcedure } from '../../trpc';

type Context = {
  prisma: PrismaClient;
};

function userSignUp(context: Context) {
  return publicProcedure.input(UserPayload).mutation(async options => {
    const { input } = options;
    let user: Awaited<User>;
    try {
      user = await context.prisma.user.create({ data: input });
    } catch (error) {
      throw handleError(error as Error);
    }

    return user;
  });
}

function handleError(error: Error) {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'This user already exists',
          cause: error,
        });
      default:
        break;
    }
  }

  throw new TRPCError({
    code: 'INTERNAL_SERVER_ERROR',
    message: 'Oops we messed up',
    cause: error,
  });
}

export default userSignUp;
