import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { MobileServices } from './mobile.service';

const createMobile = catchAsync(async (req: Request, res: Response) => {
  const result = await MobileServices.createMobileIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Create a mobile successfully done.',
    data: result,
  });
});

const updateAMobile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MobileServices.updateAMobileIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update a mobile successfully done.',
    data: result,
  });
});

const deleteAMobile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await MobileServices.deleteAMobileFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Delete a mobile successfully done.',
    data: result,
  });
});

export const MobileControllers = {
  createMobile,
  updateAMobile,
  deleteAMobile,
};
