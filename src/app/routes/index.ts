import express from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { MobileRoutes } from '../modules/mobile/mobile.routes';

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
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
