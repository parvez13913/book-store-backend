import { Model, Types } from 'mongoose';
import { IUser } from '../user/user.interface';

export type IReviewResponse = {
  reviewerName: string;
  reviewerEmail: string;
  review: string;
} & Document;

export type IBook = {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
  imageURL: string;
  owner: Types.ObjectId | IUser;
  reviews?: [IReviewResponse];
};

export type IBookFilters = {
  searchTerm?: string;
  id?: string;
  author?: string;
  genre?: string;
  title?: string;
};

export type IReview = {
  reviews: string[];
};

export type BookModel = Model<IBook, Record<string, unknown>>;
