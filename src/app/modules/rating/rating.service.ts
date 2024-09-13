import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IRating, Rating } from './rating.model';
import { Mobile } from '../mobile/mobile.model';

const createRatingIntoDB = async (email: string, payload: IRating) => {
  const { productId, ratings, review, orderId } = payload;

  // Find the user
  const user = await User.findOne({ email }, { _id: 1 });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found.');
  }

  const userId = user._id;

  // Validate if the product exists
  const product = await Mobile.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found.');
  }

  // Check if a rating already exists for the given product, order, and user
  const existingRating = await Rating.findOne({ productId, orderId, userId });
  if (existingRating) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'You have already submitted a review for this product.'
    );
  }

  // Create the new rating if no existing rating is found
  const ratingData = {
    productId,
    orderId,
    userId,
    ratings,
    review,
  };

  const createdRating = await Rating.create(ratingData);

  return createdRating;
};

const getReviewsByProductId = async (id: string) => {
  const product = await Mobile.findById(id);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, 'Product not found.');
  }

  const productReviews = await Rating.find({ productId: id });
  if (!productReviews) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No review found for this mobile.'
    );
  }

  return productReviews;
};

export const RatingServices = {
  createRatingIntoDB,
  getReviewsByProductId,
};
