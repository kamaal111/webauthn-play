import { type PrismaClient } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { UserPayload, UserResponse } from 'shared-validator/src/users';

import { publicProcedure } from '../../trpc';

type RouteContext = {
  prisma: PrismaClient;
};

function signUp({ prisma }: RouteContext) {
  return publicProcedure
    .input(UserPayload)
    .output(UserResponse)
    .mutation(async ({ input }) => {
      const knownUser = await prisma.user.findFirst({
        where: { email: input.email },
      });
      if (knownUser != null) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'This user already exists',
        });
      }

      const user = await prisma.user.create({ data: input });

      return { name: user.name, email: user.email };
    });
}

export default signUp;
