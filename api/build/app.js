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
const client_1 = require("@prisma/client");
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// parsear (convierte) a formato JSON
app.use(express_1.default.json());
// Endpoint para obtener todos los taxis
app.get('/taxis', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { plate, page = '1', limit = '10' } = req.query;
    const pageNumber = parseInt(typeof page === 'string' ? page : '1', 10);
    const limitNumber = parseInt(typeof limit === 'string' ? limit : '10', 10);
    if (isNaN(pageNumber) || isNaN(limitNumber)) {
        return res.status(400).json({ error: 'Page and limit must be valid numbers' });
    }
    try {
        const where = {};
        if (plate) {
            where.plate = String(plate);
        }
        const taxis = yield prisma.taxis.findMany({
            where,
            skip: (Number(pageNumber) - 1) * Number(limitNumber),
            take: Number(limitNumber),
        });
        res.json(taxis);
    }
    catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Error fetching taxis' });
    }
}));
// Inicia el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('Server is running on port' + PORT);
});
exports.default = app;
