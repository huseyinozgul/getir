# Getir API

This project to serve RESTful APIs using Node.js Express, and Mongo for querying records 

## Manual Installation

If you would still prefer to do the installation manually, follow these steps:

Clone the repo:

```bash
git clone https://github.com/huseyinozgul/getir.git
cd getir
npx rimraf ./.git
```

Install the dependencies:

```bash
npm install 
```

```bash
cp .env.example .env

# open .env and modify the environment variables
```

## Commands

Running locally:

```bash
npm run dev
```

Running in production:

```bash
npm start
```

Testing:

```bash
# run all tests
npm test

# run all tests in watch mode
npm run test:watch

# run test coverage
npm run coverage
```

Linting:

```bash
# run ESLint
npm run lint
```

## Environment Variables

The environment variables can be found and modified in the `.env` file. They come with these default values:

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/getir
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--errors\         # Error classes
 |--logger\         # Log handlers
 |--middlewares\    # Express middlewares 
 |--models\         # Mongoose models (data layer)
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and helper functions
 |--validations\    # Request data validation schemas (Joi)
 |--app.js          # Express app
 |--index.js        # App entry point
```

### API Endpoints

List of available routes:

**Record routes**:\
`POST /records` - Get Records\

## Error Handling

The app has a centralized error handling mechanism by express middleware.

```javascript
const { errorMiddleware } = require('./middlewares');

const app = express();

app.use(errorMiddleware);
```

The error handling middleware sends an error response, which has the following format:

```json
{
  "code": 404,
  "msg": "Not found"
}
```

When running in development mode, the error response also contains the error stack.

## Validation

Request data is validated using [Joi](https://joi.dev/). Check the [documentation](https://joi.dev/api/) for more details on how to write Joi validation schemas.

The validation schemas are defined in the `src/validations` directory and are used in the routes by providing them as parameters to the `validatorMiddleware` middleware.

```javascript
const express = require('express');
const { validatorMiddleware } = require('../middlewares');

const { recordController } = require('../controllers');
const { recordValidation } = require('../validations');

const router = express.Router();

router
  .route('/')
  .post(validatorMiddleware(recordValidation.getRecords), recordController.getRecords);

```
## Logging

Import the logger from `src/logger/logger.js`. It is using the [Winston](https://github.com/winstonjs/winston) logging library.

```javascript
const logger = require('<path to src>/logger/logger');

logger.error('message'); // level 0
logger.warn('message'); // level 1
logger.info('message'); // level 2
logger.http('message'); // level 3
logger.verbose('message'); // level 4
logger.debug('message'); // level 5
```
## Linting

Linting is done using [ESLint](https://eslint.org/)

To modify the ESLint configuration, update the `.eslintrc.json` file.

To prevent a certain file or directory from being linted, add it to `.eslintignore`
