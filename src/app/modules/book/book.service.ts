import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constants';
import { IBook, IBookFilters, IReview } from './book.interface';
import { Book } from './book.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { JwtHelpers } from '../../../helpers/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createBook = async (payload: IBook): Promise<IBook | null> => {
  const result = (await Book.create(payload)).populate('owner');

  return result;
};

const getAllBooks = async (
  filters: IBookFilters,
  paginationOption: IPaginationOptions,
): Promise<IGenericResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculatePagination(paginationOption);

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Book.find(whereCondition)
    .populate('owner')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Book.countDocuments(whereCondition);

  return {
    meta: {
      page,
      limit,
      total,
    },

    data: result,
  };
};

const getSingleBook = async (id: string): Promise<IBook | null> => {
  const result = await Book.findOne({ _id: id }).populate('owner');

  return result;
};

const updateBook = async (
  id: string,
  payload: Partial<IBook>,
  token: string,
): Promise<IBook | null> => {
  const tokenWithoutQuotes = token.slice(1, -1);
  if (!Object.keys(payload).length) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'You did not enter anything to update !',
    );
  }

  const isExist = await Book.findOne({ _id: id });

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Sorry Book not Found');
  }

  const verifiedUser = JwtHelpers.verifiedToken(
    tokenWithoutQuotes,
    config.jwt.secret as Secret,
  );

  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const book = await Book.findById({ _id: id });

  if (book?.owner.toString() !== verifiedUser?.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden..');
  }
  const result = await Book.findByIdAndUpdate({ _id: id }, payload, {
    new: true,
  });

  return result;
};

const deleteBook = async (id: string, token: string): Promise<IBook | null> => {
  const tokenWithoutQuotes = token?.slice(1, -1);

  const isBookExist = await Book.findOne({ _id: id });
  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found');
  }

  const verifiedUser = JwtHelpers.verifiedToken(
    tokenWithoutQuotes,
    config.jwt.secret as Secret,
  );

  if (!verifiedUser) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }

  const book = await Book.findById({ _id: id });

  if (book?.owner.toString() !== verifiedUser?.userId) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Forbidden..');
  }

  const result = await Book.findOneAndDelete({ _id: id });
  return result;
};

const userReview = async (
  id: string,
  review: IReview,
): Promise<IBook | null> => {
  const isBookExist = await Book.findOne({ _id: id });

  if (!isBookExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book is not found');
  }

  const result = await Book.findByIdAndUpdate(
    { _id: id },
    { $push: { reviews: review } },
    { new: true },
  );

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  userReview,
};
