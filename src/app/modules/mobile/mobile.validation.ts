import { z } from 'zod';

const createMobileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Mobile name is required.'),
    brand: z.string().min(1, 'Brand is required.'),
    model: z.string().min(1, 'Model is required.'),
    price: z.number().min(0, 'Price must be a positive number.'),
    ratings: z
      .number()
      .min(0, 'Rating must be at least 0.')
      .max(5, 'Rating cannot exceed 5.'),
    imgUrl: z.string().url('Invalid image URL.'),
    features: z
      .array(z.string().min(1, 'Feature cannot be empty.'))
      .min(1, 'At least one feature is required.'),
  }),
});

const updateMobileValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Mobile name is required.').optional(),
    brand: z.string().min(1, 'Brand is required.').optional(),
    model: z.string().min(1, 'Model is required.').optional(),
    price: z.number().min(0, 'Price must be a positive number.').optional(),
    ratings: z
      .number()
      .min(0, 'Rating must be at least 0.')
      .max(5, 'Rating cannot exceed 5.')
      .optional(),
    imgUrl: z.string().url('Invalid image URL.').optional(),
    features: z
      .array(z.string().min(1, 'Feature cannot be empty.'))
      .min(1, 'At least one feature is required.')
      .optional(),
  }),
});

export const MobileZodValidation = {
  createMobileValidationSchema,
  updateMobileValidationSchema,
};
