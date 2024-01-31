import { type PrismaClient } from '@prisma/client';

import { router } from '../../trpc';
import signUp from './sign-up';
import signUpPreCheck from './sign-up-pre-check';

type RouteContext = {
  prisma: PrismaClient;
};

function usersRouter(routeContext: RouteContext) {
  return router({
    signUpPreCheck: signUpPreCheck(routeContext),
    signUp: signUp(routeContext),
  });
}

export default usersRouter;
