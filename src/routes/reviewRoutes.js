import express from 'express';

import {
  addReview,
  removeReview
} from '../controllers/review.js';

import {
  requireLogin,
  requireEmployee
} from '../middleware/auth.js';

const router = express.Router();

router.post(
  '/',
  requireLogin,
  addReview
);

router.post(
  '/:id/delete',
  requireLogin,
  requireEmployee,
  removeReview
);

export default router;