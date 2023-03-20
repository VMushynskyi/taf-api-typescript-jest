import jp from 'jsonpath'

class RandomGenerator {

    public generateRandomString(body, jsonPath: string) {
        return jp.value(body, jsonPath, this.generateString());
    }

    public generateString() {
        return Math.random().toString(36).substring(2,7);
    }
}

export default new RandomGenerator();