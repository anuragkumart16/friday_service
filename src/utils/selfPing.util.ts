import https from "https";
import http from "http";
import { logger } from "../logger/logger";

/**
 * Starts a self-pinging interval to keep the service awake.
 * Pings the provided URL every 14 minutes.
 * 
 * @param url The URL to ping
 */
export const startSelfPing = (url: string) => {
    const PING_INTERVAL = 14 * 60 * 1000; // 14 minutes
    
    logger.info(`[Self-Ping] Initialized self-pinging for ${url} every 14 minutes.`);
    
    setInterval(() => {
        const protocol = url.startsWith("https") ? https : http;
        protocol.get(url, (res) => {
            if (res.statusCode === 200) {
                logger.info(`[Self-Ping] Successfully pinged ${url}`);
            } else {
                logger.warn(`[Self-Ping] Pinged ${url}, but received status: ${res.statusCode}`);
            }
        }).on("error", (err) => {
            logger.error(`[Self-Ping] Error pinging ${url}: ${err.message}`);
        });
    }, PING_INTERVAL);
};
