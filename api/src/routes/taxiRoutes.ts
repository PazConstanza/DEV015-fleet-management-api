import { Router } from 'express';
import { getTaxis, getTrajectories, getLastTrajectory } from '../controllers/taxiController';

const router = Router();

router.get('/taxis', getTaxis);
router.get('/trajectories', getTrajectories);
router.get('/trajectories/latest', getLastTrajectory);

export default router;
