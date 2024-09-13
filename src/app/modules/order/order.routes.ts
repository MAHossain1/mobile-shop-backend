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

router.get('/all-orders', auth(USER_ROLE.admin), OrderControllers.getAllOrders);

router.patch('/:id', auth(USER_ROLE.admin), OrderControllers.updateOrderStatus);

router.get('/my-orders', auth(USER_ROLE.user), OrderControllers.getUserOrders);

router.post(
  '/add-rating',
  auth(USER_ROLE.user),
  OrderControllers.addRatingForDeliveredProduct
);

export const OrderRoutes = router;
