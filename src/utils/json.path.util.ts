import jp from 'jsonpath'

class JsonPathUtil {

    public getValueByJsonPath(body: string , jsonPath: string) {
         return jp.value(body, jsonPath);
    }
}

export default new JsonPathUtil();