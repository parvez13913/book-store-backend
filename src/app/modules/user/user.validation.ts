import { z } from 'zod';

const createUserZodSchema = z.object({
  body: z.object({
    firstName: z.string({
      required_error: 'First Name is Required',
    }),

    lastName: z.string({
      required_error: 'Last Name is Required',
    }),

    email: z
      .string({
        required_error: 'Email is Required',
      })
      .email(),
    password: z.string({
      required_error: 'password is Required',
    }),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
  }),
});

export const UserValidation = {
  createUserZodSchema,
};
