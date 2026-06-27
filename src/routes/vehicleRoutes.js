import express from 'express';
import { showVehicles, showVehicleDetail } from '../controllers/vehicle.js';

const router = express.Router();

router.get('/', showVehicles);
router.get('/:id', showVehicleDetail);

export default router;