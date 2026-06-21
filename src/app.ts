import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { errorHandler } from "./middlewares/error.middleware";
import { httpLogger } from "./middlewares/httpLogger.middleware";

/**
 * Express Application Instance.
 * 
 * Configures middleware, routes, and error handling.
 */
const app = express();

// app-level middleware config
app.use(httpLogger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));


// router imports
import healthCheckRouter from "./routes/healthcheck.routes"
import chatRouter from "./routes/chat.routes"
import conversationRouter from "./routes/conversation.route"
import emailRouter from "./routes/email.routes"

// url mapping
app.use("/healthcheck", healthCheckRouter)
app.use("/api/v1/chat", chatRouter)
app.use("/api/v1/conversations", conversationRouter)
app.use("/api/v1/email-agent", emailRouter)


// global error handler
app.use(errorHandler);


export default app;