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
                if (parseInt(data.result.is_disabled) == 1) {
                    const data = jsonResult.error({
                        error_code: 403,
                        error_msg: "你的账户已被冻结,需向管理员申请解冻"
                    });
                    resolve(data);
                    return;
                }
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
    register(options: any) {
        return new Promise((resolve, reject) => {
            userDao.register(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "你说咋就没有成功创建用户呢？"
                    });
                    resolve(data);
                    return;
                }
                const data = jsonResult.setMap({
                    result: 1
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
    getUserById(options: any) {
        return new Promise((resolve, reject) => {
            userDao.getUserById(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "用户悄悄的跑了，不在这里！"
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
    updateUser(options: any) {
        return new Promise((resolve, reject) => {
            userDao.updateUser(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "修改用户信息没有成功啊！"
                    });
                    resolve(data);
                    return;
                }
                const data = jsonResult.setMap();
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
    getUsers(options: any) {
        return new Promise((resolve, reject) => {
            userDao.getUsers(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "没有获取到用户列表"
                    });
                    resolve(data);
                    return;
                }
                const data = jsonResult.setPaging({
                    result: res
                });
                const lists = data.result.list;

                if (lists && lists.length != 0) {
                    const length = lists.length;
                    for (let i = 0; i < length; i++) {
                        if (parseInt(lists[i].is_delete) == 0) {
                            lists[i].is_delete = false;
                        } else {
                            lists[i].is_delete = true;
                        }
                    }
                }
                if (lists && lists.length != 0) {
                    const length = lists.length;
                    for (let i = 0; i < length; i++) {
                        if (parseInt(lists[i].is_disabled) == 0) {
                            lists[i].is_disabled = false;
                        } else {
                            lists[i].is_disabled = true;
                        }
                    }
                }
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
    getUserIdentity(options: any) {
        return new Promise((resolve, reject) => {
            userDao.getUserIdentity(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "没有获取到用户分类信息"
                    });
                    resolve(data);
                    return;
                }
                const data = jsonResult.setLists({
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