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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getAllUsers = exports.createUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createUser = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.create({
        data: input,
    });
});
exports.createUser = createUser;
const getAllUsers = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });
});
exports.getAllUsers = getAllUsers;
const updateUser = (id, input) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.update({
        where: { id },
        data: input,
    });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.user.delete({
        where: { id },
    });
});
exports.deleteUser = deleteUser;
