import Promise from "bluebird";
import UserDao from "./dao/UserDao";
import jsonResult from "../util/JsonResult";

const userDao = new UserDao();
class UserService {
    constructor() { }
    login(options: any) {
        return new Promise((resolve, reject) => {
            userDao.login(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "账号或密码错误"
                    });
                    resolve(data);
                    return;
                }
                const data = jsonResult.setMap({
                    result: res
                });
                resolve(data);
            }).catch((err) => {
                const data = jsonResult.error({
                    error_code: 500,
                    error_msg: "系统异常"
                });
                reject(data);
            });
        });
    }
}

export default UserService;