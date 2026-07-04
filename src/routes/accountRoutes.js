import express from 'express';
import { requireLogin } from '../middleware/auth.js';
import {
  buildLogin,
  buildRegister,
  registerAccount,
  loginAccount,
  buildDashboard,
  logoutAccount

} from '../controllers/account.js';

const router = express.Router();

router.get('/login', buildLogin);
router.get('/register', buildRegister);
router.get('/logout', logoutAccount);

router.get('/dashboard', requireLogin, buildDashboard);

router.post('/register', registerAccount);

router.post('/login', loginAccount);

router.get('/dashboard', buildDashboard);


export default router;