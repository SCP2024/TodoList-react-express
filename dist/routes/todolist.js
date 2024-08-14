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
const router = express_1.default.Router();
router.post('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todelistModel = new model_1.TodoList(req.body);
    console.log('%c [ todelistModel ]-5', 'font-size:13px; background:pink; color:#bf2c9f;', todelistModel);
    const todolist = yield todelistModel.save();
    return res.status(200).json({ message: '创建成功' });
}));
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { current = 1, pageSize = 10, todo, status } = req.query;
    // 查询总数
    const total = yield model_1.TodoList.countDocuments(Object.assign(Object.assign({}, (todo && { todo })), (status && { status })));
    console.log('%c [ total ]-17', 'font-size:13px; background:pink; color:#bf2c9f;', total);
    // 分页查询
    const data = yield model_1.TodoList.find(Object.assign(Object.assign({}, (todo && { todo })), (status && { status })))
        .sort({ updatedAt: -1 })
        .skip((Number(current) - 1) * Number(pageSize))
        .limit(Number(pageSize));
    return res.status(200).json({ data, total });
}));
router.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield model_1.TodoList.findOne({ _id: req.params.id });
    if (book) {
        res.status(200).json({ data: book, success: true });
    }
    else {
        res.status(500).json({ message: '该事项不存在' });
    }
}));
// 更新
router.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield model_1.TodoList.findOneAndUpdate({ _id: req.params.id }, req.body);
        return res.status(200).json();
    }
    catch (error) {
        return res.status(500).json({ error });
    }
}));
router.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield model_1.TodoList.findById(req.params.id);
    if (book) {
        yield model_1.TodoList.deleteOne({ _id: req.params.id });
        res.status(200).json({ success: true });
    }
    else {
        res.status(500).json({ message: '该事项不存在' });
    }
}));
exports.default = router;
