import auth from '../../config/middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import express from 'express';
import { RatingControllers } from './rating.controller';

const router = express.Router();

router.post(
  '/create-rating',
  auth(USER_ROLE.user),
  RatingControllers.createRating
);

router.get('/:productId', RatingControllers.getReviewsByProductId);

export const RatingRoutes = router;
