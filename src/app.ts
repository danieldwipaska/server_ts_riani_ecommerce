import express, { Express } from "express";
import "dotenv/config.js";

import { authRoute } from "./routes/auth.js";
import { userRoute } from "./routes/users.js";

const app: Express = express();

//MIDDLEWARES
app.use(express.json());

//ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);

export { app };
