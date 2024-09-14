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
exports.RatingServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = require("../user/user.model");
const rating_model_1 = require("./rating.model");
const mobile_model_1 = require("../mobile/mobile.model");
const createRatingIntoDB = (email, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, ratings, review, orderId } = payload;
    // Find the user
    const user = yield user_model_1.User.findOne({ email }, { _id: 1 });
    if (!user) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'User not found.');
    }
    const userId = user._id;
    // Validate if the product exists
    const product = yield mobile_model_1.Mobile.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found.');
    }
    // Check if a rating already exists for the given product, order, and user
    const existingRating = yield rating_model_1.Rating.findOne({ productId, orderId, userId });
    if (existingRating) {
        throw new AppError_1.default(http_status_1.default.BAD_REQUEST, 'You have already submitted a review for this product.');
    }
    // Create the new rating if no existing rating is found
    const ratingData = {
        productId,
        orderId,
        userId,
        ratings,
        review,
    };
    const createdRating = yield rating_model_1.Rating.create(ratingData);
    return createdRating;
});
const getReviewsByProductId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield mobile_model_1.Mobile.findById(id);
    if (!product) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'Product not found.');
    }
    const productReviews = yield rating_model_1.Rating.find({ productId: id });
    if (!productReviews) {
        throw new AppError_1.default(http_status_1.default.NOT_FOUND, 'No review found for this mobile.');
    }
    return productReviews;
});
exports.RatingServices = {
    createRatingIntoDB,
    getReviewsByProductId,
};
