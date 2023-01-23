import "reflect-metadata";
import { createConnection, useContainer } from "typeorm";
// import * as express from "express";
const express = require("express");
// import * as bodyParser from "body-parser";
const bodyParser = require("body-parser");
import { Request, Response } from "express";
import { Routes } from "./Contrainte/Config/Routes/AppRoutes";
import { Container } from "typedi";
import { JwtUtility } from "./Commun/Token/JwtUtility";
import { AppConfig } from "./Contrainte/Config/AppConfig/AppConfig";

useContainer(Container);
createConnection({
  type: "mysql",
  host: "127.0.0.1",
  port: 3306,
  username: "root",
  password: "atwasoad21",
  database: "arendre",
  synchronize: true,
  logging: false,
  migrationsRun: true,
  entities: ["src/Donnees/DomainObject/*.ts"],
  migrations: ["src/Contrainte/Config/Migration/**/*.{ts,js}"],
  subscribers: ["src/Contrainte/Config/Subscriber/**/*.{ts,js}"],
  cli: {
    entitiesDir: "src/Donnees/DomainObject",
    migrationsDir: "src/Contrainte/Config/Migration",
    subscribersDir: "src/Contrainte/Config/Subscriber",
  },
})
  .then(async (connection) => {
    const app = express();
    app.use(AppConfig.allowCrossDomain);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(new JwtUtility().verifyToken);

    Routes.forEach((route) => {
      (app as any)[route["method"]](
        route["route"],
        (req: Request, res: Response, next: Function) => {
          const result = new (route["controller"] as any)()
            [route["action"]](req, res, next)
            .then(() => next)
            .catch((err) => next(err));
        }
      );
    });
    // app.post(
    //   "/uploadfile",
    //   upload.single("uploadedImage"),
    //   (req: Request, res: Response, next: Function) => {
    //     const file = req.file;
    //     console.log(req);
    //     if (!file) {
    //       const error = new Error("Please upload a file");
    //       return next(error);
    //     }
    //     res.status(200).send({
    //       statusCode: 200,
    //       status: "success",
    //       uploadedFile: file,
    //     });
    //   },
    //   (error, req: Request, res: Response, next: Function) => {
    //     res.status(400).send({
    //       error: error.message,
    //     });
    //   }
    // );
    app.listen(3000);
    console.log(
      "Express server has started on port 3000. Open http://localhost:3000/users to see results"
    );
  })
  .catch((error) => console.log(error));
