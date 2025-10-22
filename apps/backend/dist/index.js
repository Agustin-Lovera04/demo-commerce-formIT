"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./utils//db");
const create_app_1 = require("./utils/create-app");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(express_1.default.json());
const db = (0, db_1.connectDB)();
(0, create_app_1.createApp)(db);
//# sourceMappingURL=index.js.map