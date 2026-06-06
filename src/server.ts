import app from "./app";
import { appConfig } from "./config/envConfig";
import { startSelfPing } from "./utils/selfPing.util";

const port = appConfig.port
const microserviceName = appConfig.microserviceName

/**
 * Server Entry Point.
 * 
 * Starts the Express application on the configured port.
 */
app.listen(port, () => {
    console.log(`${microserviceName} is up and running on http://localhost:${port}`);

    // Use external URL if available (e.g., Render), otherwise fallback to localhost
    startSelfPing(`${appConfig.serverUrl}/healthcheck`);
});
