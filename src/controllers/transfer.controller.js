const Transfer = require('../models/transfer.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.transfer = catchAsync(async (req, res, next) => {
  //traemos los datos del req.body
  const { amount, senderUserId, receiverUserId } = req.body;

  if (senderUserId === receiverUserId) {
    return res.status(400).json({
      status: 'error',
      message: 'The id of the receiving user must be different from the sender',
    });
  }

  //usuario remitente
  const senderUser = await User.findOne({
    where: {
      status: 'active',
      accountNumber: senderUserId,
    },
  });

  if (!senderUser) {
    return res.status(404).json({
      status: 'error',
      message: 'Sender user not found!',
    });
  }

  //usuario receptor
  const receiverUser = await User.findOne({
    where: {
      status: 'active',
      accountNumber: receiverUserId,
    },
  });

  //verificamos 
  if (!receiverUser) {
    return res.status(404).json({
      status: 'error',
      message: 'addressee user not found!',
    });
  }


  
  if (senderUser.amount < amount ) {
    return res.status(400).json({
      status: 'error',
      message: 'Insufficient fund!',
    });
  }

  await receiverUser.update({ amount: receiverUser.amount + amount });

  await senderUser.update({ amount: senderUser.amount - amount });

  await Transfer.create({amount, senderUserId, receiverUserId,});
  
  res.status(201).json({
    status: 'success',
    message: 'Transfer created!',
  });
});
