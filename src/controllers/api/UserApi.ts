"use strict";
import { Response, Request, NextFunction } from "express";
import UserService from "../../service/UserService";
import jsonResult from "../../util/JsonResult";

const userService = new UserService();
export const login = (req: Request, res: Response) => {
  console.log(req.query);
  if (!req.query.user_name || !req.query.password) {
    const data = jsonResult.error({
      error_code: 1,
      error_msg: "账号或密码不能为空哦！"
    });
    res.json(data);
    return;
  }
  userService.login(req.query).then((results) => {
    res.json(results);
  }).catch((err) => {
    res.json(err);
  });
};


