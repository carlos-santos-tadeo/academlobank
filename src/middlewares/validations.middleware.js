const { body, validationResult } = require('express-validator');

const validateField = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  next();
};

exports.createUserValidation = [
  body('name').notEmpty().withMessage('Name is required'),
  body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 digits'),
  validateField,
];

exports.loginUserValidation = [
  body('accountNumber')
  .notEmpty()
  .withMessage('Account is required'),
  body('password')
  .notEmpty()
  .withMessage('Password is required'),
  validateField,
];


