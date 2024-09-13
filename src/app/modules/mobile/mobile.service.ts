import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TMobile } from './mobile.interface';
import { Mobile } from './mobile.model';

const createMobileIntoDB = async (payload: TMobile) => {
  const result = await Mobile.create(payload);

  return result;
};

const getAllMobiles = async () => {
  const mobiles = await Mobile.find();

  return mobiles;
};

const getSingleMobile = async (id: string) => {
  const mobiles = await Mobile.findById(id);

  return mobiles;
};

const updateAMobileIntoDB = async (
  MobileId: string,
  payload: Partial<TMobile>
) => {
  const mobile = await Mobile.findById(MobileId);

  if (!mobile) {
    throw new AppError(httpStatus.NOT_FOUND, 'Mobile not found with this id.');
  }

  const result = await Mobile.findByIdAndUpdate(MobileId, payload, {
    new: true,
  });

  return result;
};

const deleteAMobileFromDB = async (MobileId: string) => {
  const result = await Mobile.findByIdAndDelete(MobileId);

  return result;
};

export const MobileServices = {
  createMobileIntoDB,
  getAllMobiles,
  getSingleMobile,
  updateAMobileIntoDB,
  deleteAMobileFromDB,
};
