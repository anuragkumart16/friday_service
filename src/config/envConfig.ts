


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
    microserviceName: process.env.MICROSERVICE_NAME ? process.env.MICROSERVICE_NAME + "microservice" : "server",
    serverUrl: process.env.RENDER_EXTERNAL_URL || process.env.SERVER_URL || `http://localhost:${process.env.PORT || 5001}`
}

export const groqConfig = {
    GROQ_API_KEY: process.env.GROQ_API_KEY || (() => {
        throw new Error("Environment variable GROQ_API_KEY is not defined.");
    })()
}