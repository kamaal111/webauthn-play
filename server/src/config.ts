export const DEFAULT_SERVER_PORT = '3001';

export default {
  SERVER_PORT: process.env.SERVER_PORT ?? DEFAULT_SERVER_PORT,
};
