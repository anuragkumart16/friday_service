import app from "./app";
import { appConfig } from "./config/envConfig";

const port = appConfig.port
const microserviceName = appConfig.microserviceName

/**
 * Server Entry Point.
 * 
 * Starts the Express application on the configured port.
 */
app.listen(port, () => {
    console.log(`${microserviceName} is up and running on http://localhost:${port}`);
});