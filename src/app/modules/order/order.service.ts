/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { User } from '../user/user.model';
import { Mobile } from '../mobile/mobile.model';
import { IRating, Rating } from '../rating/rating.model';
import mongoose from 'mongoose';

const createOrderIntoDB = async (payload: TOrder, email: string) => {
  // console.log({ payload });
  const user = await User.findOne({ email }, { _id: 1 });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }
  const userId = user?._id.toString();
  // console.log(userId);

  let totalPrice = 0;

  const productDetails = await Promise.all(
    payload.products.map(async (item: any) => {
      // Cast the string productId to ObjectId if necessary
      // console.log(item, 'from backd prd');
      const productId = new mongoose.Types.ObjectId(item.productId);

      // Find the product by its ID
      const product = await Mobile.findById({ _id: productId });
      if (product) {
        totalPrice += product.price * item.quantity; // Accumulate total price
        return {
          productId: product._id,
          quantity: item.quantity,
        };
      } else {
        throw new Error('Product not found');
      }
    })
  );

  const order = new Order({
    userId,
    products: productDetails,
    totalAmount: totalPrice,
    status: payload.order_status || 'Pending',
    paymentMethod: 'Cash On Delivery',
  });

  console.log(order, 'order service');

  await order.save();
  return order;
};

const getAllOrders = async () => {
  const orders = await Order.find();

  return orders;
};

const updateOrderStatusIntoDB = async (
  orderId: string,
  order_status: 'Pending' | 'Canceled' | 'Delivered'
) => {
  const order = await Order.findById(orderId);

  if (!order) {
    throw new AppError(httpStatus.NOT_FOUND, 'Order not found with this id.');
  }

  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { order_status },
    { new: true, runValidators: true }
  );

  return updatedOrder;
};

const getUserOrdersFromDB = async (email: string) => {
  const user = await User.findOne({ email }, { _id: 1 });

  const result = await Order.find({ userId: user })
    .populate('userId')
    .populate({
      path: 'products.productId', // Populate product details for each product
      select: 'name price description', // Specify which product fields to return
    });
  // .populate('productId');

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
  getAllOrders,
  updateOrderStatusIntoDB,
  getUserOrdersFromDB,
  addRatingForDeliveredProduct,
};
