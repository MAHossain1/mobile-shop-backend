import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

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

const getUserOrders = catchAsync(async (req: Request, res: Response) => {
  const { userEmail } = req.user!;

  const result = await OrderServices.getUserOrdersFromDB(userEmail);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Retrieved my(user) orders successfully done.',
    data: result,
  });
});

const addRatingForDeliveredProduct = catchAsync(
  async (req: Request, res: Response) => {
    const { userEmail } = req.user!;
    // console.log(req.body, 'from controoller');
    const result = await OrderServices.addRatingForDeliveredProduct(
      userEmail,
      req.body
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Successfully added a rating for delivered product.',
      data: result,
    });
  }
);

export const OrderControllers = {
  createOrder,
  updateOrderStatus,
  getUserOrders,
  addRatingForDeliveredProduct,
};
