"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoute = void 0;
const express_1 = __importDefault(require("express"));
const postgres_1 = require("../models/postgres");
const router = express_1.default.Router();
exports.userRoute = router;
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield postgres_1.postgresPool.query("SELECT user_id, username, is_admin, created_at, updated_at FROM list_of_users WHERE user_id = $1", [userId]);
        if (user.rows[0] === undefined || user.rows[0] === null) {
            res.status(401).json("User Not Found");
        }
        else {
            res.status(200).json(user.rows);
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield postgres_1.postgresPool.query("SELECT user_id, username, is_admin, created_at, updated_at FROM list_of_users");
        res.status(200).json(users.rows);
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.put("/:id/update", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const newUsername = req.body.username;
    const newPassword = req.body.password;
    if (newUsername === undefined || newPassword === undefined) {
        res.status(401).json("Please complete your update forms");
    }
    else {
        try {
            const user = yield postgres_1.postgresPool.query("SELECT user_id, username, created_at, updated_at FROM list_of_users WHERE user_id = $1", [userId]);
            if (user.rows[0] === undefined) {
                res.status(402).json("User Not Found");
            }
            else {
                try {
                    yield postgres_1.postgresPool.query("UPDATE list_of_users SET username = $1, password = $2, updated_at = NOW() WHERE user_id = $3", [newUsername, newPassword, userId]);
                    res.status(200).json("User has been updated");
                }
                catch (err) {
                    res.status(500).json(err);
                }
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}));
router.delete("/:id/delete", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    try {
        const user = yield postgres_1.postgresPool.query("SELECT user_id, username, created_at, updated_at FROM list_of_users WHERE user_id = $1", [userId]);
        if (user.rows[0] === undefined) {
            res.status(402).json("User Not Found");
        }
        else {
            try {
                yield postgres_1.postgresPool.query("DELETE FROM list_of_users WHERE user_id = $1", [userId]);
                res.status(200).json("User has been deleted");
            }
            catch (err) {
                res.status(500).json(err);
            }
        }
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
//# sourceMappingURL=users.js.map