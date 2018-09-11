import { login, register, getUserById, updateUser, getUsers, getUserIdentity } from "../controllers/api/UserApi";

class RouterMain {
    $app: any;
    apiBody: string = process.env.API_BODY;
    constructor(app: any) {
        this.$app = app;
    }
    api() {
        this.$app.post(this.apiBody + "/account/login", login);
        this.$app.post(this.apiBody + "/account/register", register);
        this.$app.post(this.apiBody + "/account/getUserById", getUserById);
        this.$app.post(this.apiBody + "/account/updateUser", updateUser);
        this.$app.post(this.apiBody + "/account/getUsers", getUsers);
        this.$app.post(this.apiBody + "/account/getUserIdentity", getUserIdentity);
    }
}

export default RouterMain;