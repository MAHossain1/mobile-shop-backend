"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_routes_1 = require("../modules/user/user.routes");
const auth_routes_1 = require("../modules/auth/auth.routes");
const mobile_routes_1 = require("../modules/mobile/mobile.routes");
const order_routes_1 = require("../modules/order/order.routes");
const rating_routes_1 = require("../modules/rating/rating.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/users',
        route: user_routes_1.UserRoutes,
    },
    {
        path: '/auth',
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: '/mobile',
        route: mobile_routes_1.MobileRoutes,
    },
    {
        path: '/order',
        route: order_routes_1.OrderRoutes,
    },
    {
        path: '/ratings',
        route: rating_routes_1.RatingRoutes,
    },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
