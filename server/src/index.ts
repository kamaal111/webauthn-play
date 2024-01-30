import { createHTTPServer } from '@trpc/server/adapters/standalone';

import config from './config';
import appRouter from './router';

const server = createHTTPServer({
  router: appRouter,
});

server.listen(config.SERVER_PORT);
