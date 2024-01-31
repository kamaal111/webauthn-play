import { type PrismaClient } from '@prisma/client';
import {
  SignUpPreCheckPayload,
  SignUpPreCheckResponse,
} from 'shared-validator/src/users';
import { TRPCError } from '@trpc/server';
import * as crypto from 'crypto';

import { publicProcedure } from '../../trpc';

type RouteContext = {
  prisma: PrismaClient;
};

function signUpPreCheck({ prisma }: RouteContext) {
  return publicProcedure
    .input(SignUpPreCheckPayload)
    .output(SignUpPreCheckResponse)
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

      const previouslyStoredPreSignUpToken =
        await prisma.preSignUpToken.findFirst({
          where: { email: input.email },
        });
      const newTokenPayload = {
        token: crypto.randomBytes(32).toString('hex'),
        credential_id: crypto.randomUUID(),
        created_time: new Date(),
      };
      if (previouslyStoredPreSignUpToken != null) {
        const preSignUpToken = await prisma.preSignUpToken.update({
          where: { email: input.email },
          data: newTokenPayload,
        });

        return {
          token: preSignUpToken.token,
          credential_id: preSignUpToken.credential_id,
        };
      }

      const preSignUpToken = await prisma.preSignUpToken.create({
        data: { ...newTokenPayload, email: input.email },
      });

      return {
        token: preSignUpToken.token,
        credential_id: preSignUpToken.credential_id,
      };
    });
}

export default signUpPreCheck;
