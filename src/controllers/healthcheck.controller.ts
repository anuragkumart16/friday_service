import { Request, Response } from "express";
import ApiResponse from "../utils/response.util";
import { appConfig } from "../config/envConfig";

const microserviceName = appConfig.microserviceName


/**
 * Health check controller
 * @param req express request object
 * @param res express response object
 */
const healthCheck = (req: Request, res: Response) => {
    ApiResponse(res, 200, `${microserviceName} is up and running!`, {
        status: "ok",
        timestamp: new Date().toISOString()
    })
}

export { healthCheck }