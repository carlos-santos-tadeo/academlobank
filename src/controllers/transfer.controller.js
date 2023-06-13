const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.createTransfer = catchAsync(async (req, res, next) => {
  //traemos los datos del req.body
  const { amount, senderUserId, receiverUserId } = req.body;
  //usuario remitente
  const senderUser = await User.findOne({
    where: { accountNumber: senderUserId, status: 'active' },
  });
  //usuario receptor
  const receiverUser = await User.findOne({
    where: { accountNumber: receiverUserId, status: 'active' },
  });

  //verificamos 
  if (!receiverUser) {
    return res.status(404).json({
      status: 'error',
      message: 'addressee user not found!',
    });
  }
  if (!senderUser) {
    return res.status(404).json({
      status: 'error',
      message: 'Sender user not found!',
    });
  }
  if (senderUser.amount < amount ) {
    return res.status(400).json({
      status: 'error',
      message: 'Insufficient fund!',
    });
  }

  senderUser.amount -= amount;
  await senderUser.save();

  receiverUser.amount += amount;
  await receiverUser.save();

  const transfer = await Transfer.create({
    amount,
    senderUserId,
    receiverUserId,
  });
  
  res.status(201).json({
    status: 'success',
    message: 'Transfer created!',
    transfer,
  });
});
