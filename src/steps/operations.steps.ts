import apiClient from "../client/api.client";

class OperationsSteps {

    public getAllUsers(){
        return apiClient.getClient().doGet("users/");
    }

    public postUser(endpoint: string, body: Object){
        return apiClient.getClient().doPost(endpoint, body);
    }

    public updateUsernameOfTheUser(endpoint: string, name: string){
        return apiClient.getClient().doPatch(endpoint, { "username": `${name}` });
    }
    
}

export default new OperationsSteps();