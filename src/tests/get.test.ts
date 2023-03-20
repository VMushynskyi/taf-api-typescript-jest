import { beforeEach, describe, expect, test } from "@jest/globals"
import baseApiClient from "../client/base.api.client";
import randomGenerator from "../utils/random.generator";
import jsonUtil from "../utils/json.path.util";
import postRequestBody from "../payloads/postRequestPayload.json";

declare const reporter: any;

describe("Test for check basic operations", () => {

    beforeEach(() => {
        reporter
            .epic('Smoke tests')
            .feature('CRUD methods')
            .description(expect.getState().currentTestName);
    });

    test("Check get methods", async () => {
        await reporter.startStep('Start Get operation');
        const response = await baseApiClient.doGet("/users");

        expect("Leanne Graham").toEqual(await jsonUtil.getValueByJsonPath(response.data, '$..[?(@.id == 1)].name'))
        expect(200).toEqual(response.status)
        await reporter.endStep();
    });

    test("Check creation of a new entity, using post", async () => {
        await reporter.startStep('Start Post operation');

        const generatedValue = randomGenerator.generateRandomString(postRequestBody, '$..name');
        console.log(generatedValue);
        console.log(postRequestBody);
        const response = await baseApiClient.doPost("/users", postRequestBody);

        expect(generatedValue).toEqual(await jsonUtil.getValueByJsonPath(response.data, '$..name'));
        expect(201).toEqual(response.status);
        await reporter.endStep();
    })

    test("Check creation of a new entity, using post", async () => {
        await reporter.startStep('Start Patch operation');
        const response = await baseApiClient.doPatch("/users/2", { "username": "Mushynskyi" });

        expect("Mushynskyi").toEqual(await jsonUtil.getValueByJsonPath(response.data, '$..username'));
        expect(200).toEqual(response.status);
        await reporter.endStep();
    })
});