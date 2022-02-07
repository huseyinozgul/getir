const { mocked } = require('jest-mock');
const httpMocks = require('node-mocks-http');

const { recordController } = require('../../../src/controllers')
const recordService = require('../../../src/services/record.service');

jest.mock('../../../src/services/record.service');

const recordServiceMocked = mocked(recordService);

describe('Record Controller Test', () => {
    test('Valid Case', async () => {
        const body = { startDate: new Date('2017-01-20'), endDate: new Date('2017-01-30'), minCount: 1, maxCount: 500 };
        const res = httpMocks.createResponse();
        const sendSpy = jest.spyOn(res, 'send');

        const defaultRecords = [];

        recordServiceMocked.getRecords.mockResolvedValue(defaultRecords);

        await recordController.getRecords(httpMocks.createRequest({ body }), res);

        expect(res.statusCode).toEqual(200);

        expect(sendSpy).toHaveBeenCalledTimes(1);

        expect(sendSpy).toHaveBeenCalledWith({ code: 0, msg: 'success', records: defaultRecords });
    });

    test('Invalid Case', async () => {
        const body = { startDate: new Date('2017-01-20'), endDate: new Date('2017-01-30'), minCount: 1, maxCount: 500 };
        const res = httpMocks.createResponse();

        const mockedError = new Error('mongo error');

        recordServiceMocked.getRecords.mockRejectedValue(mockedError);

        try {
            await recordController.getRecords(httpMocks.createRequest({ body }), res);
            throw new Error('Code never should come in this point');
        } catch (err) {
            expect(err).toEqual(mockedError);
        }
    });
});