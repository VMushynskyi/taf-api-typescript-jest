import { beforeEach, describe, expect, test } from "@jest/globals"
import randomGenerator from "../utils/random.generator";
import jsonUtil from "../utils/json.path.util";
import postRequestBody from "../payloads/postRequestPayload.json";
import operationSteps from "../steps/operations.steps";
import { ResponseCodes } from "../constant/reposnse.code";

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

        const response = await operationSteps.getAllUsers();

        expect("Leanne Graham").toEqual(await jsonUtil.getValueByJsonPath(response.data, '$..[?(@.id == 1)].name'))
        expect(ResponseCodes.OK.valueOf()).toEqual(response.status)
        await reporter.endStep();
    });

    test("Check creation of a new entity, using post", async () => {
        await reporter.startStep('Start Post operation');

        const generatedValue = randomGenerator.generateRandomString(postRequestBody, '$..name');

        const response = await operationSteps.postUser("users", postRequestBody);

        expect(generatedValue).toEqual(await jsonUtil.getValueByJsonPath(response.data, '$..name'));
        expect(ResponseCodes.CREATED.valueOf()).toEqual(response.status);
        await reporter.endStep();
    })

    test("Check creation of a new entity, using post", async () => {
        await reporter.startStep('Start Patch operation');

        const response = await operationSteps.updateUsernameOfTheUser("users/2", "Mushynskyi");

        expect("Mushynskyi").toEqual(await jsonUtil.getValueByJsonPath(response.data, '$..username'));
        expect(ResponseCodes.OK.valueOf()).toEqual(response.status);
        await reporter.endStep();
    })
});