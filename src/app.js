const cors = require('cors');
const express = require('express');
const morgan = require('morgan');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/error.controller');

//routes
const authRouter = require('./routes/auth.routes');
// const userRouter = require('./routes/user.routes');
const transferRouter = require('./routes/transfer.routes');

const app = express();
app.use(cors());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//rutas
app.use('/api/v1/users', authRouter);
// app.use('/api/v1/users', userRouter);
app.use('/api/v1/transfers', transferRouter);

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
