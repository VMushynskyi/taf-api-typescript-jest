import axios, { Axios, AxiosResponse } from "axios";

export class BaseApiClient {

    private client: Axios;
    private apiUrl: string;
    private time: number
    private headers: Map<string, string>;

    public async doGet(endpoint: string): Promise<AxiosResponse<any, any>> {
        return this.client.get(this.apiUrl + endpoint);
    }

    public async doPost(endpoint: string, body: Object): Promise<AxiosResponse<any, any>> {
        return this.client.post((this.apiUrl + endpoint), body);
    }

    public async doPatch(endpoint: string, body: Object): Promise<AxiosResponse<any, any>> {
        return this.client.patch((this.apiUrl + endpoint), body);
    }

    ClientBuilder = class ClientBuilder {
        private builderClient: Axios;
        private apiUrl: string;
        private headers: Map<string, string>;
        private time: number;

        public setApiUrl(apiUrl: string): ClientBuilder {
            this.apiUrl = apiUrl;
            return this;
        }

        public addAdditionalHeader(headers: Map<string, string>): ClientBuilder {
            this.headers = headers;
            return this;
        }

        public setConnectionTime(time: number): ClientBuilder {
            this.time = time;
            return this;
        }

        public build(): BaseApiClient {
            let apiClient = new BaseApiClient();
            apiClient.apiUrl = this.apiUrl;
            apiClient.time = this.time;
            apiClient.headers = this.headers;
            this.createClient(apiClient);
            apiClient.client = this.builderClient;
            return apiClient;
        }

        private createClient(apiClient: BaseApiClient): void {
            this.builderClient = axios.create({
                baseURL: apiClient.apiUrl,
                timeout: apiClient.time,
                headers: Array.from(apiClient.headers).reduce((obj, [key, value]) => (
                    Object.assign(obj, { [key]: value })
                ), {})
            });
        }

    }
}