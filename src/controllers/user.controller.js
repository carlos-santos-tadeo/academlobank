const User = require('../models/user.model');

const AppError = require('../utils/appError');

const catchAsync = require('../utils/catchAsync');

exports.signup = catchAsync(async (req, res, next) => {
  const { name, password } = req.body;

  //se genera numero random de 6 digitos
  const accountNumber = Math.floor(Math.random() * 900000) + 100000;
  //constante amount con valor 1000
  const amount = 1000;

  //creacion del usuario
  const user = await User.create({
    name,
    accountNumber,
    password,
    amount,
  });

  res.status(201).json({ status: 'success', message: 'User created!', user });
});

exports.login = catchAsync(async (req, res, next) => {
  //traemos la info del req.body
  const { accountNumber, password } = req.body;
  //buscar el usuario su numero de cuenta
  const user = await User.findOne({
    where: {
      accountNumber,
      status: 'active',
    },
  });

  if (!user) {
    return next(new AppError('Incorrect data', 404));
  }

  if (!((await user.password) === password)) {
    return next(new AppError('Wrong account number or password', 401));
  }

  res.status(200).json({
    status: 'success',
    message: 'Login successful!',
    name: user.name,
    accountNumber: user.accountNumber,
    amount: user.amount,
  });
});
