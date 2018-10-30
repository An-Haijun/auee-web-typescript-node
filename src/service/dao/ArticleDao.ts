import DbConfig from "../../config/DbPoolConfig";
import Promise from "bluebird";
import utils from "../../util/FormatData";

const dbConfig = new DbConfig();

class ArtilceDao {
    constructor() { }
    createArticle(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `insert into eye_articles values(id, ${options.title}, ${options.content}, ${options.markdown_content}, ${options.user_id},` +
            ` ${options.like_number}, ${options.comment_number}, ${options.article_state}, false, ${options.article_class_id}, ${options.article_type_id}, ${options.article_tag}, ${options.create_at},` +
            ` ${options.update_at})`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    deleteArticleById(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `update eye_articles set is_delete = true where id = ${options.id}`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    updateArticle(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `update eye_articles set title = ${options.title}, content = ${options.content}, markdown_content = ${options.markdown_content}, article_state = ${options.article_state},` +
            ` is_delete = ${options.is_delete}, article_class_id = ${options.article_class_id}, article_type_id = ${options.article_type_id}, article_tag = ${options.article_tag},` +
            ` update_at = ${options.update_at} WHERE id = ${options.article_id} and user_id = ${options.user_id}`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getArticleByParams(options: any) {
        return new Promise((resolve, reject) => {
            let getCount = `SELECT COUNT(*) as total_count FROM eye_articles where user_id = ${options.user_id} and is_delete = false`;
            let getLists = `;SELECT` +
                ` art.id, art.title, art.content, art.markdown_content, art.user_id, art.like_number, art.comment_number, art.article_state, art.article_type_id, art.article_class_id, art.is_delete, art.article_tag, art.create_at,` +
                ` type.content as type_content, class.content as class_content` +
                ` FROM eye_articles as art, eye_article_type as type, eye_article_class as class where art.user_id = ${options.user_id} and art.is_delete = false and art.article_class_id = class.id and art.article_type_id = type.id`;
            const limit = ` order by create_at desc limit ${options.page}, ${options.page_size}`;
            if (options.article_class_id) {
                getCount = getCount + ` and article_class_id = ${options.article_class_id}`;
                getLists = getLists + ` and article_class_id = ${options.article_class_id}`;
            }
            if (options.article_type_id) {
                getCount = getCount + ` and article_type_id = ${options.article_type_id}`;
                getLists = getLists + ` and article_type_id = ${options.article_type_id}`;
            }
            if (options.title) {
                options.title = `%` + options.title + `%`;
                getCount = getCount + ` and  title like ${options.title}`;
                getLists = getLists + ` and  title like ${options.title}`;
            }
            const sql = getCount + getLists + limit;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getArticleById(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `SELECT` +
            ` art.id, art.title, art.content, art.markdown_content, art.user_id, art.like_number, art.comment_number, art.article_state, art.article_type_id, art.article_class_id, art.is_delete, art.article_tag, art.create_at,` +
            ` type.content as type_content, class.content as class_content` +
            ` FROM eye_articles as art, eye_article_type as type, eye_article_class as class where art.user_id = ${options.user_id} and art.id = ${options.article_id} and art.article_class_id = class.id and art.article_type_id = type.id`;

            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    createArticleType(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `insert into eye_article_type values (id, ${options.content}, ${options.user_id}, ${options.create_at}, ${options.update_at})`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    updateArticleType(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `update eye_article_type set content = ${options.content}, update_at = ${options.update_at} where id = ${options.type_id} and user_id = ${options.user_id}`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getArticleType(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `select * from eye_article_type where user_id = ${options.user_id} order by create_at desc`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    deleteArticleType(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `delete from eye_article_type where id = ${options.type_id} user_id = ${options.user_id}`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    createArticleClass(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `insert into eye_article_class values (id, ${options.content}, ${options.user_id}, ${options.create_at}, ${options.update_at})`;
            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    /* 改到这 */
    updateArticleClass(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `update eye_article_class set content = ${options.content}, update_at = ${options.update_at} where id = ${options.class_id} and user_id = ${options.user_id}`;

            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    getArticleClass(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `select * from eye_article_class where user_id = ${options.user_id} order by create_at desc`;

            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
    deleteArticleClass(options: any) {
        return new Promise((resolve, reject) => {
            const sql: string = `delete from eye_article_class where id = ${options.class_id}$ and user_id = ${options.user_id}`;

            dbConfig.query(sql).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    }
}

export default ArtilceDao;