class Jwt {
    token: string = "";
    constructor(options: any = {}) {
        this.token = options.data;
     }
    verifyToken() {
        return "";
    }
}

export default Jwt;