"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const auth_js_1 = require("./routes/auth.js");
const users_js_1 = require("./routes/users.js");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/auth", auth_js_1.authRoute);
app.use("/api/users", users_js_1.userRoute);
const port = 3000;
app.listen(port, () => {
    console.log(`listening at port ${port}`);
});
//# sourceMappingURL=app.js.map