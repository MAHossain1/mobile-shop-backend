"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const order_interface_1 = require("./order.interface");
const orderSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
    },
    products: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Mobile',
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
    totalAmount: { type: Number, required: true },
    order_status: {
        type: String,
        default: 'Pending',
        enum: {
            values: order_interface_1.OrderStatus,
            message: `{VALUE} is not a valid status.`,
        },
    },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)('Order', orderSchema);
