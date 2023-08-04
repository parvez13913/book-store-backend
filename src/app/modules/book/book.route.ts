import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.get('/:id', BookController.getSingleBook);
router.patch('/:id', BookController.updateBook);
router.post('/create-book', BookController.createBook);
router.get('/', BookController.getAllBooks);

export const BookRoute = router;
