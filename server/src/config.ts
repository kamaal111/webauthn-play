export default {
  SERVER_PORT:
    process.env.SERVER_PORT != null ? Number(process.env.SERVER_PORT) : 3001,
};
