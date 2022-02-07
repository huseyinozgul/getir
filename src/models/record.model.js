const mongoose = require('mongoose');

const recordSchema = new mongoose.Schema(
    {
        key: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            required: true,
        },
        counts: [{
            type: Number
        }]
    },
    {
        collection: 'records',
        toJSON: { virtuals: true }
    }
);

const Record = mongoose.model('records', recordSchema);

module.exports = Record;
