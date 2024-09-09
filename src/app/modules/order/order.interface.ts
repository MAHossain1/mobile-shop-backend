import { Types } from 'mongoose';

export const OrderStatus = ['Pending', 'Delivered'];

export type TOrderStatus = 'Pending' | 'Delivered';

export type TOrder = {
  productId: Types.ObjectId;
  userId: Types.ObjectId;
  order_status: TOrderStatus;
};
