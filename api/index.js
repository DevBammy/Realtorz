import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
dotenv.config();
const mongo = process.env.MONGO;
const port = process.env.PORT || 5000;

import authRouter from './routes/authRoute.js';
import userRouter from './routes/userRoute.js';
import listingRouter from './routes/listingRoute.js';

mongoose
  .connect(mongo)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.listen(port, () => {
  console.log('server started on the right port😁');
});

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/listing', listingRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error!';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
