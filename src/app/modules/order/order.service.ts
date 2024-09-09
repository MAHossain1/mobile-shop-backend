import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { User } from '../user/user.model';
import { Mobile } from '../mobile/mobile.model';
import { IRating, Rating } from '../rating/rating.model';

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

const getUserOrdersFromDB = async (email: string) => {
  const user = await User.findOne({ email }, { _id: 1 });

  const result = await Order.find({ userId: user })
    .populate('userId')
    .populate('productId');

  return result;
};

const addRatingForDeliveredProduct = async (
  email: string,
  payload: IRating
) => {
  const { orderId, productId, ratings, review } = payload;

  const user = await User.findOne({ email }, { _id: 1 });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  const userId = user?._id.toString();

  // Find the order
  const order = await Order.findOne({
    _id: orderId,
    userId: userId,
    order_status: 'Delivered',
  });

  if (!order) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Order not found or not delivered.'
    );
  }

  // Check if the productId in the order matches the provided productId
  if (order.productId.toString() !== productId.toString()) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Product not found in this order.'
    );
  }

  const product = await Mobile.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found.');
  }

  // Check if the user has already rated the product
  const existingRating = await Rating.findOne({ productId, userId });
  if (existingRating) {
    throw new AppError(
      httpStatus.CONFLICT,
      'User has already rated this product.'
    );
  }

  const ratingData = {
    productId,
    userId,
    ratings,
    review,
  };

  const createdRating = await Rating.create(ratingData);

  return createdRating;
};

export const OrderServices = {
  createOrderIntoDB,
  updateOrderStatusIntoDB,
  getUserOrdersFromDB,
  addRatingForDeliveredProduct,
};
