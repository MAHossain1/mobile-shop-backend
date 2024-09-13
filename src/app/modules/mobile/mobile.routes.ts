import express from 'express';
import validateRequest from '../../config/middlewares/validateRequest';
import { MobileZodValidation } from './mobile.validation';
import auth from '../../config/middlewares/auth';
import { USER_ROLE } from '../user/user.constant';
import { MobileControllers } from './mobile.controller';

const router = express.Router();

router.post(
  '/add-product',
  auth(USER_ROLE.admin),
  validateRequest(MobileZodValidation.createMobileValidationSchema),
  MobileControllers.createMobile
);

router.get('/', MobileControllers.getAllMobiles);
router.get('/:mobileId', MobileControllers.getSingleMobile);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(MobileZodValidation.updateMobileValidationSchema),
  MobileControllers.updateAMobile
);

router.delete('/:id', auth(USER_ROLE.admin), MobileControllers.deleteAMobile);

export const MobileRoutes = router;
