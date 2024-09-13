import { model, Schema } from 'mongoose';
import { OrderStatus, TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    products: [
      {
        productId: {
          type: Schema.Types.ObjectId,
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
        values: OrderStatus,
        message: `{VALUE} is not a valid status.`,
      },
    },
  },

  { timestamps: true }
);

export const Order = model<TOrder>('Order', orderSchema);
