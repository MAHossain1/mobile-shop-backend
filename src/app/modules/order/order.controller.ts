import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { OrderServices } from './order.service';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.createOrderIntoDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Order Created Successfully done.',
    data: result,
  });
});

const updateOrderStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.updateOrderStatusIntoDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Update a order successfully done.',
    data: result,
  });
});

export const OrderControllers = {
  createOrder,
  updateOrderStatus,
};
