import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { bookSearchableFields } from './book.constants';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';

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

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
};
