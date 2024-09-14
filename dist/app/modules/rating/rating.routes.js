"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingRoutes = void 0;
const auth_1 = __importDefault(require("../../config/middlewares/auth"));
const user_constant_1 = require("../user/user.constant");
const express_1 = __importDefault(require("express"));
const rating_controller_1 = require("./rating.controller");
const router = express_1.default.Router();
router.post('/create-rating', (0, auth_1.default)(user_constant_1.USER_ROLE.user), rating_controller_1.RatingControllers.createRating);
router.get('/:productId', rating_controller_1.RatingControllers.getReviewsByProductId);
exports.RatingRoutes = router;
