import App from './app';
import config from './config';
import HealthRouter from './routers/health';
import UsersRouter from './routers/users';

import type { AppRouter } from './types';

const routers: AppRouter[] = [new HealthRouter(), new UsersRouter()];

const app = new App({ routers });

app.listen({ serverPort: config.SERVER_PORT });
