import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { IBook } from './book.interface';
import httpStatus from 'http-status';
import { BookService } from './book.service';
import pick from '../../../shared/pick';
import { bookFiltrableFields } from './book.constants';
import { paginationFields } from '../../constants/paginationConstants';

const createBook = catchAsync(async (req: Request, res: Response) => {
  const { ...bookData } = req.body;
  const result = await BookService.createBook(bookData);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully!',
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFiltrableFields);
  const paginationOption = pick(req.query, paginationFields);
  const result = await BookService.getAllBooks(filters, paginationOption);

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
};
