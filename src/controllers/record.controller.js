const { recordService } = require('../services');

const getRecords = async (req, res) => {
    const { startDate, endDate, minCount, maxCount } = req.body;

    const records = await recordService.getRecords({ startDate, endDate, minCount, maxCount });

    res.status(200).send({ code: 0, msg: 'success', records });
}

module.exports = {
    getRecords
}