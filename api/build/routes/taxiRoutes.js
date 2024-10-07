"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const taxiController_1 = require("../controllers/taxiController");
const router = (0, express_1.Router)();
router.get('/taxis', taxiController_1.getTaxis);
router.get('/trajectories', taxiController_1.getTrajectories);
exports.default = router;
