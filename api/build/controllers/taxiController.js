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
exports.getLastTrajectory = exports.getTrajectories = exports.getTaxis = void 0;
const taxiService_1 = require("../services/taxiService");
const getTaxis = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { plate, page, limit } = req.query;
        const taxis = yield (0, taxiService_1.getAllTaxis)(plate, page, limit);
        res.json(taxis);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching taxis' });
    }
});
exports.getTaxis = getTaxis;
const getTrajectories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { taxiId, date } = req.query;
        if (!taxiId || !date) {
            return res.status(400).json({ error: 'taxiId and date are required' });
        }
        const trajectories = yield (0, taxiService_1.getTaxiTrajectories)(parseInt(taxiId), date);
        if (!trajectories) {
            return res.status(404).json({ error: 'No trajectories found' });
        }
        res.json(trajectories);
    }
    catch (error) {
        res.status(500).json({ error: 'Error fetching taxi trajectories' });
    }
});
exports.getTrajectories = getTrajectories;
const getLastTrajectory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const trajectories = yield (0, taxiService_1.getLatestTrajectories)();
    if (!trajectories || trajectories.length === 0) {
        return res.status(404).json({ error: 'No trajectories found' });
    }
    // Tomar el primer objeto de la lista de "trajectories"
    const formattedTrajectories = trajectories.map(taxi => {
        const latestTrajectory = taxi.trajectories[0]; // Obtener la última trayectoria
        let response = {};
        if (latestTrajectory != undefined) {
            response = {
                taxiId: taxi.id,
                plate: taxi.plate,
                date: latestTrajectory.date.toISOString().replace('T', ' ').replace('.000Z', '') || '',
                latitude: latestTrajectory.latitude || '',
                longitude: latestTrajectory.longitude || ''
            };
        }
        else {
            response = {
                taxiId: taxi.id,
                plate: taxi.plate
            };
        }
        return response;
    });
    res.json(formattedTrajectories);
});
exports.getLastTrajectory = getLastTrajectory;
