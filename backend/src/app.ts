import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import userRouter from './routes/users';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use((req: Request, res: Response, next: NextFunction) => {
    console.log('req arrived', req.url, req.method);
    next();
});
app.use(express.urlencoded({ extended: true }));

app.use('/', userRouter);

app.use((err: unknown, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.sendStatus(500);
    next();
});

export { app };
