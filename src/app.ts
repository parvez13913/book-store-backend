import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { UserRouter } from './app/modules/user/user.route';
import { BookRoute } from './app/modules/book/book.route';
import { AuthRouter } from './app/modules/auth/auth.route';

const app: Application = express();

app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', UserRouter);
app.use('/api/v1/books', BookRoute);
app.use('/api/v1/auth', AuthRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Working Successfully');
});

app.use(globalErrorHandler);

export default app;
