import { SortOrder } from 'mongoose';

type IOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

type IOptionsResult = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (options: IOptions): IOptionsResult => {
  const page = options.page !== undefined ? Number(options.page) : 1;
  const limit = options.limit !== undefined ? Number(options.limit) : Infinity;
  const skip = Number.isFinite(limit) ? (page - 1) * limit : 0;

  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const PaginationHelpers = {
  calculatePagination,
};
