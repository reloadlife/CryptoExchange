import { serve } from "@hono/node-server";
import { startServer } from "./src/app";
import env from "./src/config/env";
import logger from "./src/config/logger";

async function main() {
  try {
    const app = await startServer(env.PORT);

    const server = serve({
      fetch: app.fetch,
      port: env.PORT,
    });

    logger.info(
      `🚀 Crypto Exchange API running on http://localhost:${env.PORT}`
    );

    return server;
  } catch (error) {
    logger.error("Failed to start server", {
      error: error instanceof Error ? error.message : error,
    });
    process.exit(1);
  }
}

main().catch((error) => {
  logger.error("Unexpected error during startup", {
    error: error instanceof Error ? error.message : error,
  });
  process.exit(1);
});
