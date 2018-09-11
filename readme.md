## 引入强性js - typescript 重新编写程序

## 我大热 typescript

## 配置 webpack 开发环境

    npm install --save-dev babel babel-loader babel-polyfill babel-preset-env ts-loader uglifyjs-webpack-plugin webpack webpack-dev-server webpack-merge

## fs 读取文件

import fs from "fs";
console.log("查看 /file 目录");
const fsLists: any = [];

const fsFile = (name: string) => {
  fs.readdir(`./src/${name}`, function (err, files) {
    if (err) return console.log(err);
    files.forEach(function (child) {
      if (child.indexOf(".ts") > 0) {
        fsLists.push(`./src/${name}/${child}`);
      }
    });
    console.log("2----:", fsLists);
  });
  console.log("3----:", fsLists);
};
fs.readdir("./src", function (err, files) {
  if (err) return console.log(err);
  files.forEach(function (file) {
    if (file) {
      if (file.indexOf(".ts") > 0) {
        fsLists.push(`./src/${file}`);
      } else {
        fsFile(file);
      }
    }
  });
});