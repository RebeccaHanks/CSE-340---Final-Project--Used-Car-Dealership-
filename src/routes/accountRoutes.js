import express from 'express';
import {
  buildLogin,
  buildRegister
} from '../controllers/account.js';

const router = express.Router();

router.get('/login', buildLogin);
router.get('/register', buildRegister);

export default router;