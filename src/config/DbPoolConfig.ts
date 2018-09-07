import mysql from "mysql";
import Promise from "bluebird";

/**
 * mysql数据库基础连接操作 - 改用数据库连接池
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
            const $poolConnection: any = mysql.createPool(this.config);
            const connectFun = () => {
                return new Promise((resolve, reject) => {
                    $poolConnection.getConnection((err: any, connext: any) => {
                        if (err) {
                            // throw err;
                            reject(err);
                            return;
                        }
                        resolve(connext);
                    });

                });
            };
            const queryFun = (sql: string, connect: any) => {
                return new Promise((resolve, reject) => {
                    $poolConnection.query(sql, (err: any, results: any, fields: any) => {

                        if (err) {
                            // throw err;
                            reject(err);
                            return;
                        }
                        resolve(results);
                        // 释放连接池中的数据库连接
                        connect.release();
                        // 停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
                        $poolConnection.end();
                    });
                });
            };
            connectFun().then((connect) => { return queryFun(sql, connect); }).then((res: any) => {
                $resolve(res);
            }).catch((err: any) => {
                $reject(err);
                $poolConnection.end(function (err: any) {
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