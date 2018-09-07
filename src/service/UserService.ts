import Promise from "bluebird";
import UserDao from "./dao/UserDao";

const userDao = new UserDao();
class UserService {
    constructor() {}
    login(options: any) {
        return new Promise((resolve, reject) => {
            userDao.login(options).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

export default UserService;