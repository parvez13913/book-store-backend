import express from 'express';
import { BookController } from './book.controller';
import validateRequest from '../../middlewares/validateRequest';
import { BookValidation } from './book.validation';

const router = express.Router();

router.get('/:id', BookController.getSingleBook);
router.patch('/:id', BookController.updateBook);
router.delete('/:id', BookController.deleteBook);
router.post(
  '/create-book',
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createBook,
);
router.get('/', BookController.getAllBooks);

export const BookRoute = router;
