import { login } from "../controllers/api/UserApi";

class RouterMain {
    $app: any;
    apiBody: string = process.env.API_BODY;
    constructor(app: any) {
        this.$app = app;
    }
    api() {
        this.$app.get(this.apiBody + "/account/login", login);
    }
}

export default RouterMain;