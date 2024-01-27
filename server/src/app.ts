import express from 'express';
import logger from 'morgan';
import type { AppRouter } from './types';
import ErrorsController from './controllers/errors';
import { PrismaClient } from '@prisma/client';

class App {
  private readonly app: express.Express;
  private readonly errors: ErrorsController;
  private readonly prisma: PrismaClient;

  constructor({ routers }: { routers: AppRouter[] }) {
    this.app = express();
    this.errors = new ErrorsController();
    this.prisma = new PrismaClient();

    this.initializeMiddleware();
    this.initializeRoutes(routers);
  }

  listen({ serverPort }: { serverPort: string }) {
    this.app.listen(serverPort, () => {
      console.log(`server listening on port ${serverPort}`);
    });
  }

  private initializeMiddleware() {
    this.app.use(logger('dev'));
    this.app.use(express.json());
  }

  private initializeRoutes(routers: AppRouter[]) {
    for (const router of routers) {
      router.injectContext({ prisma: this.prisma });
      this.app.use(router.path, router.router);
    }

    this.errors.handle(this.app);
  }
}

export default App;
