import { appConfig } from "../../src/config/envConfig";

describe("Test if all Environment Variables are being loaded", () => {

    it("All app level environment variables are loaded", () => {
        expect(appConfig.port).toBeDefined();
        expect(appConfig.nodeEnv).toBeDefined();
        expect(appConfig.microserviceName).toBeDefined();
    });

});