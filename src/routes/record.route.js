const express = require('express');
const { validatorMiddleware } = require('../middlewares');

const { recordController } = require('../controllers');
const { recordValidation } = require('../validations');

const router = express.Router();

router
  .route('/')
  .post(validatorMiddleware(recordValidation.getRecords), recordController.getRecords);

module.exports = router;
