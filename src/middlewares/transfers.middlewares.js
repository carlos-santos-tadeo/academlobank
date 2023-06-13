const { body, validationResult } = require('express-validator');

const validateField = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  next();
};

exports.createTransferValidation = [
  body('amount').notEmpty().withMessage('Amount is required'),
  body('senderUserId').notEmpty().withMessage('Sender user id is required'),
  body('receiverUserId').notEmpty().withMessage('Receiver user id is required'),
  validateField,
];
