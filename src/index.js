
const app = require('./app');
const mongoose = require('mongoose');

const config = require('./config');
const logger = require('./logger/logger');

async function main() {
    await mongoose.connect(config.mongoose.url, config.mongoose.options);
    logger.info('Connected to MongoDB');

    await app.listen(config.port);
    logger.info(`Server running at: http://localhost:${config.port}`);
}

main().catch(err => logger.error(err));