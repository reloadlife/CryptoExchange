import { Hono } from "hono";
import { health } from "./health.js";
import { trades } from "./trades.js";

const apiRoutes = new Hono();

apiRoutes.route("/health", health);
apiRoutes.route("/trades", trades);

export { apiRoutes };
