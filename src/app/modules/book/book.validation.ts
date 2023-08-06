import { z } from 'zod';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    author: z.string({
      required_error: 'Author is Required',
    }),
    genre: z.string({
      required_error: 'Genre is Required',
    }),
    publicationDate: z.string({
      required_error: 'Publication date is Required',
    }),
    imageURL: z.string({
      required_error: 'Image URL is Required',
    }),
    owner: z.string({
      required_error: 'Owner is Required',
    }),
    reviews: z.string().optional(),
  }),
});
const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z.string().optional(),
    publicationDate: z.string().optional(),
    imageURL: z.string().optional(),
    owner: z.string().optional(),
    reviews: z.string().optional(),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
};
