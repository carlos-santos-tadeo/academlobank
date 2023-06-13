const express = require('express');

//controllers
const transferController = require('../controllers/transfer.controller');

//middlewares
const transferMiddleware = require('../middlewares/transfers.middlewares');

const router = express.Router();

router.post('/', transferMiddleware.createTransferValidation, transferController.createTransfer);

module.exports = router;
