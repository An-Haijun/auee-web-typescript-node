import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import dotenv from "dotenv";
import path from "path";
import expressValidator from "express-validator";

dotenv.config({ path: ".env.example" });

import parseJson from "./util/JsonResult";
import Jwt from "./util/Jwt";
import RouterMain from "./router/RouterMain";

const app = express();

app.set("port", process.env.PORT || 3001);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "ejs");

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());

// app.use("/static", express.static(path.join(__dirname, "util")));

console.log("服务器运行中...");

app.use((req, res, next) => {
  if (req.url.indexOf("/api") > -1 && req.url != "/api/blog/account/login" && req.url != "/api/blog/account/register") {
    const token = req.headers.token;
    const jwt = new Jwt({ data: token });
    const result = jwt.verifyToken();
    if (result == "err") {
      const resultData = parseJson.error({
        success: false,
        error_code: 7,
        error_msg: "登录已过期,请重新登录"
      });
      res.json(resultData);
      // res.render("login.html");
    } else if (result == "noToken") {
      const resultData = parseJson.error({
        success: false,
        error_code: 7,
        error_msg: "站住，请出示你的token"
      });
      res.json(resultData);
    } else {
      next();
    }
  } else {
    next();
  }
});

const routerMain = new RouterMain(app);
routerMain.api();

export default app;