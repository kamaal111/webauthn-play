import { type PrismaClient } from '@prisma/client';

import { router } from '../../trpc';
import userSignUp from './user-sign-up';

type Context = {
  prisma: PrismaClient;
};

function usersRouter(context: Context) {
  return router({
    userSignUp: userSignUp(context),
  });
}

export default usersRouter;
