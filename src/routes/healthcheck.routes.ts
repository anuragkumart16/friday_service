import { Router } from "express";
import { healthCheck } from "../controllers/healthcheck.controller";

/**
 * Health Check Routes.
 * 
 * Defines the routing for health check endpoints.
 */
const router = Router()

router.route("/").get(healthCheck)


export default router