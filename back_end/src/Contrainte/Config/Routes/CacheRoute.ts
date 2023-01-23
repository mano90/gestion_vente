import { Container } from "typedi";
import { CacheController } from "../../../Infrastructure/CacheController";
import { RouteFactory } from "../../Factory/RouteFactory";

const routeFactory = Container.get(RouteFactory);
export const cacheRoute = [
  routeFactory.createGetRoute("/api/getCache", "getCache", CacheController),
  routeFactory.createGetRoute(
    "/api/deleteCache",
    "deleteCache",
    CacheController
  ),
  routeFactory.createPostRoute("/api/cache", "cache", CacheController),
];
