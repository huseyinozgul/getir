const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config();

const envSchema = Joi.object()
    .keys({
        PORT: Joi.number().default(3000),
        MONGODB_URI: Joi.string().required().description('MongoDB URI'),
    })
    .unknown();

const { value: variables, error } = envSchema.prefs({ errors: { label: 'key' } }).validate(process.env);

if (error) {
    throw new Error(`Environment variables validation error: ${error.message}`);
}

module.exports = {
    env: variables.NODE_ENV,
    port: variables.PORT,
    mongoose: {
        url: variables.MONGODB_URI,
        options: {
            useUnifiedTopology: true
        },
    },
}
