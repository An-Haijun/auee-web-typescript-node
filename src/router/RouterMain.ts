import { Response, Request, NextFunction } from "express";
import { login } from "../controllers/api/UserApi";

class RouterMain {
    $app: any;
    constructor(app: any) {
        this.$app = app;
    }
    api() {
        this.$app.get("/account/login", login);
    }
}

export default RouterMain;