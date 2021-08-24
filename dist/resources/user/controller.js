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
exports.createUser = exports.allUsers = void 0;
// I'm importing the patched version of prisma model from service
const service_1 = __importDefault(require("./service"));
const allUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield service_1.default.findMany();
        if (result)
            res.json({ data: result });
        if (!result)
            res.json({ msg: "Users not found" });
    }
    catch (e) {
        console.log(e);
        res.json(e.message);
    }
});
exports.allUsers = allUsers;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = req.body;
    try {
        // This is my modified create version, with password hashing
        const result = yield service_1.default.createWithHash(newUser);
        if (result)
            res.json({ data: result });
        if (!result)
            res.json({ msg: "User not found" });
    }
    catch (e) {
        console.log(e);
        res.json(e.message);
    }
});
exports.createUser = createUser;
