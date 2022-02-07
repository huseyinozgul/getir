const { Record } = require('../models');
const DateHelpers = require('../utils/DateHelpers');

const getRecords = async ({ startDate, endDate, minCount, maxCount }) => {

    const endDt = DateHelpers.addDay(endDate, 1);

    const records = await Record.aggregate([
        { "$match": { "createdAt": { "$gte": startDate, "$lt": endDt } } },
        { "$project": { "_id": false, "key": "$key", "createdAt": "$createdAt", "totalCount": { "$sum": "$counts" } } },
        { "$match": { "totalCount": { "$gte": minCount, "$lte": maxCount } } }
    ]);

    return records;
};

module.exports = {
    getRecords
}