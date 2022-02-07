const Joi = require('joi');

const getRecords = {
    body: Joi.object().keys({
        startDate: Joi.date().less(Joi.ref('endDate')).required(),
        endDate: Joi.date().required(),
        minCount: Joi.number().integer().min(0).required(),
        maxCount: Joi.number().integer().greater(Joi.ref('minCount')).required()
    }),
}

module.exports = {
    getRecords
}