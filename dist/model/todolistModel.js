"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const todolistSchema = new mongoose_1.default.Schema({
    todo: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
    },
    deadline: {
        type: String,
    },
    user: {
        type: String,
    }
});
exports.default = todolistSchema;
