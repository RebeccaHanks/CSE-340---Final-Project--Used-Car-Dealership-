import express from 'express';

import {
  showVehicles,
  showVehicleDetail,
  showManageVehicles,
  showAddVehicle,
  addVehicle,
  showEditVehicle,
  editVehicle,
  removeVehicle
} from '../controllers/vehicle.js';

import { requireEmployee } from '../middleware/auth.js';

const router = express.Router();

router.get('/manage', requireEmployee, showManageVehicles);

router.get('/add', requireEmployee, showAddVehicle);
router.post('/add', requireEmployee, addVehicle);

router.get('/edit/:id', requireEmployee, showEditVehicle);
router.post('/edit/:id', requireEmployee, editVehicle);

router.post('/delete/:id', requireEmployee, removeVehicle);

router.get('/', showVehicles);
router.get('/:id', showVehicleDetail);

export default router;