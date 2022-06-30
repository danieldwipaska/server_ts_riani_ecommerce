import express from "express";
import "dotenv/config.js";
import { authRoute } from "./routes/auth.js";
import { userRoute } from "./routes/users.js";
const app = express();
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
export { app };
//# sourceMappingURL=app.js.map