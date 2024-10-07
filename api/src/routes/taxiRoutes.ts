import { Router } from 'express';
import { getTaxis, getTrajectories } from '../controllers/taxiController';

const router = Router();

router.get('/taxis', getTaxis);
router.get('/trajectories', getTrajectories);

export default router;
