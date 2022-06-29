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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoute = void 0;
const express_1 = __importDefault(require("express"));
const postgres_1 = require("../models/postgres");
const router = express_1.default.Router();
exports.authRoute = router;
router.post("/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    const isAdmin = req.body.isAdmin;
    if (username === undefined || password === undefined || isAdmin === undefined)
        res.status(401).json("Please complete your registration form");
    try {
        yield postgres_1.postgresPool.query("INSERT INTO list_of_users (username, password, is_admin, created_at, updated_at) VALUES ($1, $2, $3, NOW(), NOW())", [username, password, isAdmin]);
        res.status(200).json("Register Successful!");
    }
    catch (err) {
        res.status(500).json(err);
    }
}));
router.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const username = req.body.username;
    const password = req.body.password;
    if (username === undefined || password === undefined) {
        res.status(401).json("Do not leave username or password blank");
    }
    else {
        try {
            const user = yield postgres_1.postgresPool.query("SELECT user_id, username, password, is_admin, created_at, updated_at FROM list_of_users WHERE username = $1", [username]);
            if (user.rowCount === 0) {
                res.status(402).json("Wrong Username");
            }
            else {
                if (password != user.rows[0].password) {
                    res.status(402).json("Wrong Password");
                }
                else if (password === user.rows[0].password) {
                    const _a = user.rows[0], { password } = _a, userData = __rest(_a, ["password"]);
                    res.status(200).json(userData);
                }
            }
        }
        catch (err) {
            res.status(500).json(err);
        }
    }
}));
//# sourceMappingURL=auth.js.map