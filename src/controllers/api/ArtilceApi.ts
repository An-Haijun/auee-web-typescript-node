"use strict";
import { Response, Request, NextFunction } from "express";
import ArticleService from "../../service/ArticleService";
import jsonResult from "../../util/JsonResult";

const articleService = new ArticleService();

export const createArticle = (req: Request, res: Response) => {
    if (!req.body.user_name || !req.body.password) {
        const data = jsonResult.error({
            error_code: 1,
            error_msg: "账号或密码不能为空哦！"
        });
        res.json(data);
        return;
    }
    articleService.createArticle(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const deleteArticleById = (req: Request, res: Response) => {
    articleService.deleteArticleById(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const updateArticle = (req: Request, res: Response) => {
    articleService.updateArticle(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const getArticleByParams = (req: Request, res: Response) => {
    articleService.getArticleByParams(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const getArticleById = (req: Request, res: Response) => {
    articleService.getArticleById(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const createArticleType = (req: Request, res: Response) => {
    articleService.createArticleType(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const updateArticleType = (req: Request, res: Response) => {
    articleService.updateArticleType(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const getArticleType = (req: Request, res: Response) => {
    articleService.getArticleType(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const deleteArticleType = (req: Request, res: Response) => {
    articleService.deleteArticleType(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const createArticleClass = (req: Request, res: Response) => {
    articleService.createArticleClass(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const updateArticleClass = (req: Request, res: Response) => {
    articleService.updateArticleClass(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const getArticleClass = (req: Request, res: Response) => {
    articleService.getArticleClass(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};

export const deleteArticleClass = (req: Request, res: Response) => {
    articleService.deleteArticleClass(req.body).then((results) => {
        res.json(results);
    }).catch((err) => {
        res.json(err);
    });
};




