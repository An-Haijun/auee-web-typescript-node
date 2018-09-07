import async from "async";
import crypto from "crypto";
import nodemailer from "nodemailer";
import { Request, Response, NextFunction } from "express";
const request = require("express-validator");


/**
 * GET /login
 * Login page.
 */
export let getLogin = (req: Request, res: Response) => {
  res.render("account/login", {
    title: "Login"
  });
};