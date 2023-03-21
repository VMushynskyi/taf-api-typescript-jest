import { BaseApiClient } from "./base.api.client";

class ApiClient {

    private readonly url = "https://jsonplaceholder.typicode.com/";

    public getClient() {
        return new BaseApiClient().ClientBuilder.prototype
            .setApiUrl(this.url)
            .addAdditionalHeader(new Map([
                ['Accept', '*/*'],
            ]))
            .setConnectionTime(2000)
            .build();
    }
}

export default new ApiClient();