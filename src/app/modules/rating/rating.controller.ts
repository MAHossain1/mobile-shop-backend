import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { RatingServices } from './rating.service';

const createRating = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.user!;

  const result = await RatingServices.createRatingIntoDB(userEmail, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Rating created done.',
    data: result,
  });
});

export const RatingControllers = {
  createRating,
};
