import DbConfig from "../../config/DbConfig";
import Promise from "bluebird";
const dbConfig = new DbConfig();
class UserDao {
    constructor() { }
    login(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `select u.id, u.name, u.user_name, u.user_identity_id, ( select type from eye_identity where id = u.user_identity_id ) as identity_type, u.is_disabled from eye_users as u where user_name = "${options.user_name}" and password = "${options.password}" and is_delete = 0`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

export default UserDao;