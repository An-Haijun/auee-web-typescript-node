"use strict";

import async from "async";
import request from "request";
import { Response, Request, NextFunction } from "express";
import UserService from "../../service/UserService";

const userService = new UserService();

export const login = (req: Request, res: Response, ) => {
  userService.login(req.query).then((result) => {
    res.json(result);
  }).catch((err) => {
    res.json(err);
  });
};

