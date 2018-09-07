import mysql from "mysql";
import Promise from "bluebird";

/**
 * mysql数据库基础连接操作
 */
class DbConfig {
    config: any = {
        host: process.env.MYSQL_HOST,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DB,
        user: process.env.MYSQL_USERNAME,
        password: process.env.MYSQL_PASSWORD,
        multipleStatements: true
    };

    constructor() { }

    query(sql: string, params: any = {}) {
        return new Promise(($resolve, $reject) => {
            const $connection: any = mysql.createConnection(this.config);
            const connectFun = () => {
                return new Promise((resolve, reject) => {
                    $connection.connect((err: any) => {
                        if (err) {
                            // throw err;
                            reject(err);
                            return;
                        }
                        resolve();
                    });

                });
            };
            const queryFun = (sql: string, params: any = {}) => {
                return new Promise((resolve, reject) => {
                    $connection.query(sql, params, (err: any, results: any, fields: any) => {

                        if (err) {
                            // throw err;
                            reject(err);
                            return;
                        }
                        resolve(results);
                        // 停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败

                    });
                });
            };
            connectFun().then(() => { return queryFun(sql); }).then((res: any) => {
                $resolve(res);
                $connection.end(function (err: any) {
                    if (err) {
                        console.log("关闭数据库连接失败！");
                        throw err;
                    }
                });
            }).catch((err: any) => {
                $reject(err);
                $connection.end(function (err: any) {
                    if (err) {
                        console.log("关闭数据库连接失败！");
                        throw err;
                    }
                });
            });
        });
    }
}

export default DbConfig;