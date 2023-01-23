import { Request } from "express";
import { Response } from "express";

export class AppConfig {
  static allowCrossDomain = (req: Request, res: Response, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
    res.header(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization, authorization"
    );
    next();
  };
}
