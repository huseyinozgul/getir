const { mocked } = require('jest-mock');
const httpMocks = require('node-mocks-http');

const recordService = require('../../../src/services/record.service');
const recordModel = require('../../../src/models/record.model');

jest.mock('../../../src/models/record.model');

const recordModelMocked = mocked(recordModel);

describe('Record Service Test', () => {
    test('Valid Case - getRecords', async () => {
        const params = { startDate: new Date('2017-01-20'), endDate: new Date('2017-01-30'), minCount: 1, maxCount: 500 };

        const defaultRecords = [{ key: '', createdAt: '', totalCount: 0 }];
        recordModelMocked.aggregate.mockResolvedValue(defaultRecords);

        const records = await recordService.getRecords(params);

        expect(Array.isArray(records)).toBe(true);

        records.forEach(el => {
            expect(el).toHaveProperty('key');
            expect(el).toHaveProperty('createdAt');
            expect(el).toHaveProperty('totalCount');
        })

    });

    test('Invalid Case - getRecords', async () => {
        const params = { startDate: new Date('2017-01-20'), endDate: new Date('2017-01-30'), minCount: 1, maxCount: 500 };

        const mockedError = new Error('mongo error');
        recordModelMocked.aggregate.mockRejectedValue(mockedError);

        try {
            await recordService.getRecords(params);
            throw new Error('Code never should come in this point');
        } catch (err) {
            expect(err).toEqual(mockedError);
        }
    });
});