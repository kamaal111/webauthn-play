import { type PrismaClient } from '@prisma/client';

import { router } from '../../trpc';
import signUp from './sign-up';

type RouteContext = {
  prisma: PrismaClient;
};

function usersRouter(routeContext: RouteContext) {
  return router({
    signUp: signUp(routeContext),
  });
}

export default usersRouter;
