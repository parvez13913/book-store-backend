import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string(),
    author: z.string(),
    genre: z.string(),
    publicationDate: z.string(),
    imageURL: z.string(),
    owner: z.string(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
};
