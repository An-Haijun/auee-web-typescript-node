"use strict";
import { Response, Request, NextFunction } from "express";
import UserService from "../../service/UserService";
import jsonResult from "../../util/JsonResult";

const userService = new UserService();
export const login = (req: Request, res: Response) => {
  if (!req.body.user_name || !req.body.password) {
    const data = jsonResult.error({
      error_code: 1,
      error_msg: "账号或密码不能为空哦！"
    });
    res.json(data);
    return;
  }
  userService.login(req.body).then((results) => {
    res.json(results);
  }).catch((err) => {
    res.json(err);
  });
};

export const register = (req: Request, res: Response) => {
  console.log(req.body);
  userService.register(req.body).then((results) => {
    res.json(results);
  }).catch((err) => {
    res.json(err);
  });
};

export const getUserById = (req: Request, res: Response) => {
  console.log(req.body);
  userService.getUserById(req.body).then((results) => {
    res.json(results);
  }).catch((err) => {
    res.json(err);
  });
};

export const updateUser = (req: Request, res: Response) => {
  console.log(req.body);
  userService.updateUser(req.body).then((results) => {
    res.json(results);
  }).catch((err) => {
    res.json(err);
  });
};

export const getUsers = (req: Request, res: Response) => {
  console.log(req.body);
  userService.getUsers(req.body).then((results) => {
    res.json(results);
  }).catch((err) => {
    res.json(err);
  });
};


export const getUserIdentity = (req: Request, res: Response) => {
  console.log(req.body);
  userService.getUserIdentity(req.body).then((results) => {
    res.json(results);
  }).catch((err) => {
    res.json(err);
  });
};



