import Promise from "bluebird";
import ArticleDao from "./dao/ArticleDao";
import jsonResult from "../util/JsonResult";
import utils from "../util/FormatData";

const articleDao = new ArticleDao();
class ArticleService {
    constructor() { }
    createArticle(options: any) {
        return new Promise((resolve, reject) => {
            articleDao.createArticle(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "创建新文章没有成功啊"
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
    deleteArticleById(options: any) {
        return new Promise((resolve, reject) => {
            articleDao.deleteArticleById(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "删除文章没有成功啊"
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
    updateArticle(options: any) {
        options.update_at = utils.dateFormat().all;
        return new Promise((resolve, reject) => {
            articleDao.updateArticle(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "更新文章没有成功啊"
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
    getArticleByParams(options: any) {
        options.page_size = options.page_size ? options.page_size : 10;
        options.page = options.page ? (options.page - 1) * options.page_size : 0;
        return new Promise((resolve, reject) => {
            articleDao.getArticleByParams(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "没有获取到文章列表"
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
                        if (lists[i].article_state === "PUBLIC") {
                            lists[i].article_state_name = "公开";
                        } else {
                            lists[i].article_state_name = "私密";
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
    getArticleById(options: any) {
        return new Promise((resolve, reject) => {
            articleDao.getArticleById(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "没有获取到文章内容"
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
    createArticleType(options: any) {
        return new Promise((resolve, reject) => {
            articleDao.createArticleType(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "创建文章类型没有成功"
                    });
                    resolve(data);
                    return;
                }
                const data = jsonResult.setLists({
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
    updateArticleType(options: any) {
        options.update_at = utils.dateFormat().all;
        return new Promise((resolve, reject) => {
            articleDao.updateArticleType(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "更新文章类型没有成功"
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
    getArticleType(options: any) {
        return new Promise((resolve, reject) => {
            articleDao.getArticleType(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "没有获取到文章类型"
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
    deleteArticleType(options: any) {
        return new Promise((resolve, reject) => {
            articleDao.deleteArticleType(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "删除文章类型没有成功"
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
    createArticleClass(options: any) {
        return new Promise((resolve, reject) => {
            articleDao.createArticleClass(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "删除文章分类没有成功啊"
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
    updateArticleClass(options: any) {
        options.update_at = utils.dateFormat().all;
        return new Promise((resolve, reject) => {
            articleDao.updateArticleClass(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "更新文章分类没有成功啊"
                    });
                    resolve(data);
                    return;
                }
                const data = jsonResult.setPaging({
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
    getArticleClass(options: any) {
        return new Promise((resolve, reject) => {
            articleDao.getArticleClass(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "没有获取到文章分类"
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
    deleteArticleClass(options: any) {
        return new Promise((resolve, reject) => {
            articleDao.deleteArticleClass(options).then((res: any) => {
                if (res && res.length == 0) {
                    const data = jsonResult.error({
                        error_code: 1,
                        error_msg: "删除文章分类失败"
                    });
                    resolve(data);
                    return;
                }
                const data = jsonResult.setLists({
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
}

export default ArticleService;