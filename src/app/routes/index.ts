import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { MobileRoutes } from '../modules/mobile/mobile.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { RatingRoutes } from '../modules/rating/rating.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/mobile',
    route: MobileRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/ratings',
    route: RatingRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
