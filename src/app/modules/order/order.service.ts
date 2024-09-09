import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TOrder } from './order.interface';
import { Order } from './order.model';

const createOrderIntoDB = async (payload: TOrder) => {
  const result = await Order.create(payload);

  return result;
};

const updateOrderStatusIntoDB = async (
  orderId: string,
  payload: Partial<TOrder>
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found with this id.');
  }

  const result = await Order.findByIdAndUpdate(orderId, payload, {
    new: true,
  });

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  updateOrderStatusIntoDB,
};
