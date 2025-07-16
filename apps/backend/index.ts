import { startServer } from "./src/app";
import env from "./src/config/env";
import logger from "./src/config/logger";

const app = await startServer(env.PORT);

logger.info(`🚀 Crypto Exchange API running on http://localhost:${env.PORT}`);

export default {
  fetch: app.fetch,
  port: env.PORT,
};
