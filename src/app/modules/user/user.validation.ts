import { z } from 'zod';

const createUserZodValidation = z.object({
  body: z.object({
    name: z
      .string()
      .min(1, 'name is required')
      .max(20, 'name should not exceeded 100 character.'),
    email: z.string().email('Email is not valid').min(1, 'Email is required'),
    password: z
      .string()
      .min(1, 'password is required')
      .max(20, 'password should not exceeded 20 character.'),
  }),
});

export const UserValidationSchema = {
  createUserZodValidation,
};
