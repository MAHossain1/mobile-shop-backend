"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Rating = void 0;
// rating.model.ts
const mongoose_1 = require("mongoose");
const ratingSchema = new mongoose_1.Schema({
    productId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Mobile', // Refers to your existing Mobile model
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User', // Refers to your existing User model
    },
    orderId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: false,
        ref: 'Order', // Refers to your existing User model
    },
    ratings: {
        type: Number,
        required: true,
        min: [0, 'Rating must be at least 0'],
        max: [5, 'Rating cannot exceed 5'],
    },
    review: {
        type: String,
        required: false,
    },
}, {
    timestamps: true,
});
exports.Rating = (0, mongoose_1.model)('Rating', ratingSchema);
