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
exports.getTaxiTrajectories = exports.getAllTaxis = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllTaxis = (plate_1, ...args_1) => __awaiter(void 0, [plate_1, ...args_1], void 0, function* (plate, page = '1', limit = '10') {
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);
    const where = {};
    if (plate)
        where.plate = plate;
    return yield prisma.taxis.findMany({
        where,
        skip: (pageNumber - 1) * limitNumber,
        take: limitNumber,
    });
});
exports.getAllTaxis = getAllTaxis;
const getTaxiTrajectories = (taxiId, date) => __awaiter(void 0, void 0, void 0, function* () {
    const startDate = new Date(date);
    const endDate = new Date(startDate);
    endDate.setUTCHours(23, 59, 59, 999);
    return yield prisma.taxis.findFirst({
        where: { id: taxiId },
        include: {
            trajectories: {
                where: {
                    date: {
                        gte: startDate,
                        lte: endDate,
                    },
                },
            },
        },
    });
});
exports.getTaxiTrajectories = getTaxiTrajectories;
