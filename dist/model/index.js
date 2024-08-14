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
exports.TodoList = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userModel_1 = __importDefault(require("./userModel"));
const todolistModel_1 = __importDefault(require("./todolistModel"));
var uri = 'mongodb://Ivy:W8023you1314@cluster0-shard-00-00.cqnlz.mongodb.net:27017,cluster0-shard-00-01.cqnlz.mongodb.net:27017,cluster0-shard-00-02.cqnlz.mongodb.net:27017/?ssl=true&replicaSet=atlas-xp76jn-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        mongoose_1.default.connect(uri);
    });
}
main().then(() => {
    console.log('MongoDB connected');
}).catch((err) => {
    console.log('MongoDB connection error');
    console.log(err);
});
const User = mongoose_1.default.model("User", userModel_1.default);
exports.User = User;
const TodoList = mongoose_1.default.model("TodoList", todolistModel_1.default);
exports.TodoList = TodoList;
