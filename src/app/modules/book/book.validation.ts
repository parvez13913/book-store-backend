import { z } from 'zod';
import { Genre } from './book.constants';

const createBookZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is Required',
    }),
    author: z.string({
      required_error: 'Author is Required',
    }),
    genre: z.enum([...Genre] as [string, ...string[]], {
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
    reviews: z
      .array(
        z.object({
          reviewerName: z.string().optional(),
          reviewerEmail: z.string().optional(),
          review: z.string({
            required_error: 'Review is required',
          }),
        }),
      )
      .optional(),
  }),
});

const updateBookZodSchema = z.object({
  body: z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    genre: z
      .enum([...Genre] as [string, ...string[]], {
        required_error: 'Genre is Required',
      })
      .optional(),
    publicationDate: z.string().optional(),
    imageURL: z.string().optional(),
    owner: z.string().optional(),
    reviews: z.array(z.object({})).optional(),
  }),
});

const reviewZodSchema = z.object({
  body: z.object({
    reviews: z.string({
      required_error: 'Reviews is Required',
    }),
  }),
});

export const BookValidation = {
  createBookZodSchema,
  updateBookZodSchema,
  reviewZodSchema,
};
