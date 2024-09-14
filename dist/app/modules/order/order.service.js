"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderServices = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const order_model_1 = require("./order.model");
const user_model_1 = require("../user/user.model");
const mobile_model_1 = require("../mobile/mobile.model");
const rating_model_1 = require("../rating/rating.model");
const mongoose_1 = __importDefault(require("mongoose"));
const createOrderIntoDB = (payload, email) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log({ payload });
    const user = yield user_model_1.User.findOne({ email }, { _id: 1 });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    const userId = user === null || user === void 0 ? void 0 : user._id.toString();
    // console.log(userId);
    let totalPrice = 0;
    const productDetails = yield Promise.all(payload.products.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        // Cast the string productId to ObjectId if necessary
        // console.log(item, 'from backd prd');
        const productId = new mongoose_1.default.Types.ObjectId(item.productId);
        // Find the product by its ID
        const product = yield mobile_model_1.Mobile.findById({ _id: productId });
        if (product) {
            totalPrice += product.price * item.quantity; // Accumulate total price
            return {
                productId: product._id,
                quantity: item.quantity,
            };
        }
        else {
            throw new Error('Product not found');
        }
    })));
    const order = new order_model_1.Order({
        userId,
        products: productDetails,
        totalAmount: totalPrice,
        status: payload.order_status || 'Pending',
        paymentMethod: 'Cash On Delivery',
    });
    // console.log(order, 'order service');
    yield order.save();
    return order;
});
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find();
    return orders;
});
const updateOrderStatusIntoDB = (orderId, order_status) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(orderId);
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found with this id.');
    }
    const updatedOrder = yield order_model_1.Order.findByIdAndUpdate(orderId, { order_status }, { new: true, runValidators: true });
    return updatedOrder;
});
const getUserOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email }, { _id: 1 });
    const result = yield order_model_1.Order.find({ userId: user })
        .populate('userId')
        .populate({
        path: 'products.productId', // Populate product details for each product
        select: 'name price description', // Specify which product fields to return
    });
    // .populate('productId');
    return result;
});
const addRatingForDeliveredProduct = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { orderId, productId, ratings, review } = payload;
    const user = yield user_model_1.User.findOne({ email }, { _id: 1 });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    const userId = user === null || user === void 0 ? void 0 : user._id.toString();
    // Find the order
    const order = yield order_model_1.Order.findOne({
        _id: orderId,
        userId: userId,
        order_status: 'Delivered',
    });
    if (!order) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Order not found or not delivered.');
    }
    const product = yield mobile_model_1.Mobile.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found.');
    }
    // Check if the user has already rated the product
    const existingRating = yield rating_model_1.Rating.findOne({ productId, userId });
    if (existingRating) {
        throw new AppError_1.default(http_status_1.default.CONFLICT, 'User has already rated this product.');
    }
    const ratingData = {
        productId,
        userId,
        ratings,
        review,
    };
    const createdRating = yield rating_model_1.Rating.create(ratingData);
    return createdRating;
});
exports.OrderServices = {
    createOrderIntoDB,
    getAllOrders,
    updateOrderStatusIntoDB,
    getUserOrdersFromDB,
    addRatingForDeliveredProduct,
};
