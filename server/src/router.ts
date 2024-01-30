import { PrismaClient } from '@prisma/client';

import { router } from './trpc';
import usersRouter from './users/routes';

const prisma = new PrismaClient();

const appRouter = router({
  users: usersRouter({ prisma }),
});

export type AppRouter = typeof appRouter;

export default appRouter;
