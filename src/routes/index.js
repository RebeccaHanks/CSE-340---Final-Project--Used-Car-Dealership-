import express from 'express';
import { buildHome } from '../controllers/home.js';

const router = express.Router();

router.get('/', buildHome);

export default router;