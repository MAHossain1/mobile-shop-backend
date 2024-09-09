import express from 'express';
import auth from '../../config/middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { OrderControllers } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  auth(USER_ROLE.user),
  OrderControllers.createOrder
);

router.put('/:id', auth(USER_ROLE.admin), OrderControllers.updateOrderStatus);

export const OrderRoutes = router;
