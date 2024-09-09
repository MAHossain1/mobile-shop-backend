import { model, Schema } from 'mongoose';
import { OrderStatus, TOrder } from './order.interface';

const orderSchema = new Schema<TOrder>({
  productId: { type: Schema.Types.ObjectId, required: true, ref: 'Mobile' },
  userId: { type: Schema.Types.ObjectId, required: true, ref: 'User' },
  order_status: {
    type: String,
    default: 'Pending',
    enum: {
      values: OrderStatus,
      message: `{VALUE} is not a valid status.`,
    },
  },
});

export const Order = model<TOrder>('Order', orderSchema);
