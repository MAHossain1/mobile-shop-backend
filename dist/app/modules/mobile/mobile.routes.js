"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../config/middlewares/validateRequest"));
const mobile_validation_1 = require("./mobile.validation");
const auth_1 = __importDefault(require("../../config/middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const mobile_controller_1 = require("./mobile.controller");
const router = express_1.default.Router();
router.post('/add-product', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(mobile_validation_1.MobileZodValidation.createMobileValidationSchema), mobile_controller_1.MobileControllers.createMobile);
router.get('/', mobile_controller_1.MobileControllers.getAllMobiles);
router.get('/:mobileId', mobile_controller_1.MobileControllers.getSingleMobile);
router.put('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), (0, validateRequest_1.default)(mobile_validation_1.MobileZodValidation.updateMobileValidationSchema), mobile_controller_1.MobileControllers.updateAMobile);
router.delete('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), mobile_controller_1.MobileControllers.deleteAMobile);
exports.MobileRoutes = router;
