import DbConfig from "../../config/DbPoolConfig";
import Promise from "bluebird";
import utils from "../../util/FormatData";

const dbConfig = new DbConfig();

class UserDao {
    constructor() { }
    login(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `select u.id, u.name, u.user_name, u.user_identity_id, ( select type from eye_identity where id = u.user_identity_id ) as identity_type, u.is_disabled from eye_users as u`
                + ` where user_name = "${options.user_name}" and password = "${options.password}" and is_delete = 0`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    register(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `insert into eye_users (name, user_name, password, mobile, email, intro, user_identity_id, is_disabled, is_delete, create_at, update_at)`
                + ` values(${options.name}, ${options.user_name}, ${options.password}, ${options.mobile}, ${options.email}, ${options.intro}, ${options.user_identity_id}, false, false, ${options.create_at}, ${options.update_at})`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getUserById(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `select u.id, u.name, u.user_name, u.mobile, u.email, u.intro, u.user_identity_id, ( select type from eye_identity where id = u.user_identity_id ) as identity_type from eye_users as u`
                + ` where id = ${options.user_id}`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    updateUser(options: any) {
        return new Promise((resolve, reject) => {
            options.update_at = utils.dateFormat().all;
            let header: string = `update eye_users set`;
            const where: string = ` update_at = "${options.update_at}" where id = ${options.user_id}`;
            if (typeof options.is_disabled == "boolean") {
                header = header + ` is_disabled = ${options.is_disabled},`;
            }
            if (typeof options.is_delete == "boolean") {
                header = header + ` is_delete = ${options.is_delete},`;
            }
            if (options.user_name) {
                header = header + ` user_name = ${options.user_name},`;
            }
            if (options.password) {
                header = header + ` password = ${options.password},`;
            }
            if (options.mobile) {
                header = header + ` mobile = ${options.mobile},`;
            }
            if (options.email) {
                header = header + ` email = ${options.email},`;
            }
            if (options.user_identity_id) {
                header = header + ` user_identity_id = ${options.user_identity_id},`;
            }
            if (options.intro) {
                header = header + ` intro = ${options.intro},`;
            }
            const sql: string = header + where;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getUsers(options: any) {
        return new Promise((resolve, reject) => {
            let getUserCount: string = `SELECT COUNT(*) as total_count FROM eye_users as u where user_identity_id = ${options.user_identity_id} and is_delete = 0`;
            let getUserLists: string = `; select u.id, u.name, u.user_name,u.mobile,u.email,u.user_identity_id, u.is_disabled ,iden.content as identity_content, u.create_at from eye_users as u, eye_identity as iden`
                + ` where u.user_identity_id = ${options.user_identity_id} and u.user_identity_id = iden.id and is_delete = 0`;
            if (options.name && options.user_name) {
                options.name = "%" + options.name + "%";
                options.user_name = "%" + options.user_name + "%";
                getUserCount = getUserCount + ` and (u.name like ${options.name} or u.user_name like ${options.user_name})`;
                getUserLists = getUserLists + ` and (u.name like ${options.name} or u.user_name like ${options.user_name})`;
            }
            const limit: string = ` order by u.create_at desc limit ${options.page}, ${options.page_size}`;
            const sql: string = getUserCount + getUserLists + limit;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getUserIdentity(options: any) {
        return new Promise((resolve, reject) => {
            let sql: string = `select *, (select count(*) from eye_users as users where users.user_identity_id = iden.id and users.is_delete = 0) as user_count from eye_identity as iden`
                + ` where type != "super"`;
            if (options.identity_type == "manager") {
                sql = sql + " and type != 'manager'";
            }
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

export default UserDao;