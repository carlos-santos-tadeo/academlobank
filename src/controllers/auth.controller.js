const User = require('../models/user.model');

const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;
  //se genera numero random de 6 digitos
  const accountNumber = Math.floor(Math.random()* 900000) + 100000;
  
  const user = await User.create({ name, password,accountNumber });

  res
    .status(201)
    .json({ status: 'success', message: 'User created!', user });
});

exports.login = catchAsync(async (req, res, next) => {
  //traemos la info del req.body
  const { accountNumber, password } = req.body;
  //buscar el usuario su numero de cuenta
  const user = await User.findOne({ where: { accountNumber } });
  if (!user) {
    return next(new AppError('Incorrect data', 404));
  }
  if (!((await user.password) === password)) {
    return next(new AppError('Incorrect data', 401));
  }

  res.status(200).json({ status: 'success', message: 'Login successful!' });
});
