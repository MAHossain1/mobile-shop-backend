import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import { IRating, Rating } from './rating.model';
import { Mobile } from '../mobile/mobile.model';

const createRatingIntoDB = async (email: string, payload: IRating) => {
  const { productId, ratings, review } = payload;

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

  // Create the new rating
  const ratingData = {
    productId,
    userId,
    ratings,
    review,
  };

  const createdRating = await Rating.create(ratingData);

  return createdRating;
};

export const RatingServices = {
  createRatingIntoDB,
};
