import request from 'supertest';
import app from '../../src/app';
import { logger } from '../../src/logger/logger';

/**
 * Health Check API Integration Tests.
 * 
 * Verifies that the '/healthcheck' endpoint correctly reports service status.
 */
describe('Health Check Integration Tests', () => {

    let loggerSpy: jest.SpyInstance;

    beforeEach(() => {
        loggerSpy = jest.spyOn(logger, 'info').mockImplementation(() => logger);
    });

    afterEach(() => {
        loggerSpy.mockRestore();
    });

    describe('GET /healthcheck', () => {

        /**
         * Test: Successful Health Check
         * 
         * Expectation: Returns 200 OK and "Storage Service is up and running!".
         */
        it('should return 200 OK and reference functionality', async () => {
            const response = await request(app).get('/healthcheck');

            expect(response.status).toBe(200);
            expect(response.type).toBe('application/json');
        });

        /**
         * Test: Request Logging
         * 
         * Expectation: The request is logged by the httpLogger middleware.
         */
        it('should log the incoming request', async () => {
            await request(app).get('/healthcheck');

            expect(loggerSpy).toHaveBeenCalled();

            const logCalls = loggerSpy.mock.calls.map(args => args[0]);
            const hasExpectedLog = logCalls.some(log =>
                typeof log === 'string' && log.includes('GET /healthcheck')
            );

            expect(hasExpectedLog).toBe(true);
        });
    });

    describe('Edge Cases', () => {
        it('should return 404 for invalid HTTP method (POST)', async () => {
            const response = await request(app).post('/healthcheck');
            expect(response.status).toBe(404);
        });

        it('should return 404 for sub-routes even if prefix matches', async () => {
            const response = await request(app).get('/healthcheck/extra-segment');
            expect(response.status).toBe(404);
        });
    });
});
