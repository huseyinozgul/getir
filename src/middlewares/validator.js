const Joi = require('joi');
const httpStatus = require('http-status');
const ApiError = require('../errors/ApiError');
const getMatched = require('../utils/getMatched');

const validator = (schema) => (req, res, next) => {
  const validSchema = getMatched(schema, ['params', 'query', 'body']);
  const validationObj = getMatched(req, Object.keys(validSchema));

  const { value, error } = Joi.compile(validSchema).prefs({ errors: { label: 'key' }, abortEarly: false }).validate(validationObj);

  if (error) {
    const errMsg = error.details.map((details) => details.message).join(', ');
    return next(new ApiError(httpStatus.BAD_REQUEST, errMsg));
  }
  Object.assign(req, value);
  return next();
};

module.exports = validator;
