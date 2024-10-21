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
exports.deleteUserController = exports.updateUserController = exports.getAllUsersController = exports.createUserController = void 0;
const userService_1 = require("../services/userService");
const createUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        const user = yield (0, userService_1.createUser)({ name, email, password });
        res.status(201).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
});
exports.createUserController = createUserController;
const getAllUsersController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = '1', limit = '10' } = req.query;
        const users = yield (0, userService_1.getAllUsers)(parseInt(page), parseInt(limit));
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching users' });
    }
});
exports.getAllUsersController = getAllUsersController;
const updateUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        if (!name || !email) {
            return res.status(400).json({ error: 'Name and email are required' });
        }
        const user = yield (0, userService_1.updateUser)(parseInt(id), { name, email, password });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error: 'Error updating user' });
    }
});
exports.updateUserController = updateUserController;
const deleteUserController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield (0, userService_1.deleteUser)(parseInt(id));
        res.status(204).send();
    }
    catch (error) {
        res.status(500).json({ error: 'Error deleting user' });
    }
});
exports.deleteUserController = deleteUserController;
