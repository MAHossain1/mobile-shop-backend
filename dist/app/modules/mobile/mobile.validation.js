"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MobileZodValidation = void 0;
const zod_1 = require("zod");
const createMobileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Mobile name is required.'),
        brand: zod_1.z.string().min(1, 'Brand is required.'),
        model: zod_1.z.string().min(1, 'Model is required.'),
        price: zod_1.z.number().min(0, 'Price must be a positive number.'),
        ratings: zod_1.z
            .number()
            .min(0, 'Rating must be at least 0.')
            .max(5, 'Rating cannot exceed 5.'),
        imgUrl: zod_1.z.string().url('Invalid image URL.'),
        features: zod_1.z
            .array(zod_1.z.string().min(1, 'Feature cannot be empty.'))
            .min(1, 'At least one feature is required.'),
    }),
});
const updateMobileValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().min(1, 'Mobile name is required.').optional(),
        brand: zod_1.z.string().min(1, 'Brand is required.').optional(),
        model: zod_1.z.string().min(1, 'Model is required.').optional(),
        price: zod_1.z.number().min(0, 'Price must be a positive number.').optional(),
        ratings: zod_1.z
            .number()
            .min(0, 'Rating must be at least 0.')
            .max(5, 'Rating cannot exceed 5.')
            .optional(),
        imgUrl: zod_1.z.string().url('Invalid image URL.').optional(),
        features: zod_1.z
            .array(zod_1.z.string().min(1, 'Feature cannot be empty.'))
            .min(1, 'At least one feature is required.')
            .optional(),
    }),
});
exports.MobileZodValidation = {
    createMobileValidationSchema,
    updateMobileValidationSchema,
};
