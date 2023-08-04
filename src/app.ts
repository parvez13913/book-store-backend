import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRouter } from './app/modules/user/user.route';
import { BookRoute } from './app/modules/book/book.route';

const app: Application = express();

app.use(cors());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/books', BookRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully');
});

app.use(globalErrorHandler);

export default app;
