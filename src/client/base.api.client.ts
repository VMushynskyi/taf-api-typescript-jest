import axios, { Axios } from 'axios';
class ApiClient {

    private axiosInstance: Axios;

    constructor() {
        this.axiosInstance = axios.create({
            baseURL: 'https://jsonplaceholder.typicode.com/',
            timeout: 2000
        });
    }

    public async doGet(endpoint: string) {
        return this.axiosInstance.get(endpoint);
    }

    public async doPost(endpoint: string, body: Object) {
        return this.axiosInstance.post(endpoint, body)
    }

    public async doPatch(endpoint: string, body: Object) {
        return this.axiosInstance.patch(endpoint, body)
    }
}

export default new ApiClient();