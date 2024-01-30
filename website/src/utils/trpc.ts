import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { type AppRouter } from 'server/src/router';

import config from '@/config';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: config.SERVER_URL,
    }),
  ],
});

export default trpc;
