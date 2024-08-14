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
const express_1 = __importDefault(require("express"));
const model_1 = require("../model");
var router = express_1.default.Router();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    const userModel = new model_1.User(req.body);
    const oldUser = yield model_1.User.findOne({ name });
    if (!oldUser) {
        yield userModel.save();
        return res.status(200).json({ success: true });
    }
    else {
        return res.status(500).json({ message: "用户已存在" });
    }
}));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { current, pageSize, name, status } = req.query;
    try {
        const allData = yield model_1.User.find(Object.assign(Object.assign({}, (name && { name })), (status && { status })));
        const data = yield model_1.User.find(Object.assign(Object.assign({}, (name && { name })), (status && { status })))
            .sort({ updatedAt: -1 })
            .skip((Number(current) - 1) * Number(pageSize))
            .limit(Number(pageSize));
        return res.status(200).json({
            data,
            total: allData.length,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "服务端异常" });
    }
}));
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.User.findByIdAndUpdate(req.params.id, req.body);
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(500).json({ message: "找不到该用户" });
    }
}));
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield model_1.User.findOne({ _id: req.params.id });
        let data = user === null || user === void 0 ? void 0 : user.toJSON();
        data === null || data === void 0 ? true : delete data.password;
        return res.status(200).json({ data, success: true });
    }
    catch (error) {
        return res.status(500).json({ message: "获取数据失败" });
    }
}));
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.User.deleteOne({ _id: req.params.id });
        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(500).json({ message: "用户不存在" });
    }
}));
exports.default = router;
