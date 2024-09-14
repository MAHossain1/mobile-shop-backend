"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../config/middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const order_controller_1 = require("./order.controller");
const router = express_1.default.Router();
router.post('/create-order', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.OrderControllers.createOrder);
router.get('/all-orders', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderControllers.getAllOrders);
router.patch('/:id', (0, auth_1.default)(user_constant_1.USER_ROLE.admin), order_controller_1.OrderControllers.updateOrderStatus);
router.get('/my-orders', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.OrderControllers.getUserOrders);
router.post('/add-rating', (0, auth_1.default)(user_constant_1.USER_ROLE.user), order_controller_1.OrderControllers.addRatingForDeliveredProduct);
exports.OrderRoutes = router;
