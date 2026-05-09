


/**
 * Application Configuration.
 * 
 * Centralized configuration object populated from environment variables.
 * 
 * @property port - The port number the server will listen on. Defaults to 5001.
 * @property nodeEnv - The current Node.js environment (e.g., 'development', 'production'). Defaults to 'dev'.
 * @property microserviceName - The name of the microservice. Derived from env var or defaults to 'server'.
 */
export const appConfig = {
    port: process.env.PORT || 5001,
    nodeEnv: process.env.NODE_ENV || "dev",
    microserviceName: process.env.MICROSERVICE_NAME ? process.env.MICROSERVICE_NAME + "microservice" : "server"
}

