import { Types } from 'mongoose';

export const OrderStatus = ['Pending', 'Delivered', 'Canceled'];

export type TOrderStatus = 'Pending' | 'Delivered' | 'Canceled';

export type TOrder = {
  userId: Types.ObjectId;
  products: Array<{
    productId: Types.ObjectId;
    quantity: number;
  }>;
  totalAmount: number;
  order_status: TOrderStatus;
};
