"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.authRoute = router;
router.get('/', (req, res) => {
    res.json('This is Auth Route');
});
//# sourceMappingURL=auth.js.map