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

import { requireLogin } from '../middleware/auth.js';

const router = express.Router();

router.get('/manage', requireLogin, showManageVehicles);

router.get('/add', requireLogin, showAddVehicle);
router.post('/add', requireLogin, addVehicle);

router.get('/edit/:id', requireLogin, showEditVehicle);
router.post('/edit/:id', requireLogin, editVehicle);

router.post('/delete/:id', requireLogin, removeVehicle);

router.get('/', showVehicles);
router.get('/:id', showVehicleDetail);

export default router;