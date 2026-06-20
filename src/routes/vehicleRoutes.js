import express from 'express';
import { buildVehicles } from '../controllers/vehicle.js';

const router = express.Router();

router.get('/', buildVehicles);

export default router;