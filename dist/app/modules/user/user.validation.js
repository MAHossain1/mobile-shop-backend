"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const createUserZodValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string()
            .min(1, 'name is required')
            .max(20, 'name should not exceeded 100 character.'),
        email: zod_1.z.string().email('Email is not valid').min(1, 'Email is required'),
        password: zod_1.z
            .string()
            .min(1, 'password is required')
            .max(20, 'password should not exceeded 20 character.'),
    }),
});
exports.UserValidationSchema = {
    createUserZodValidation,
};
