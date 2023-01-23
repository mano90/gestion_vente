import { Container } from "typedi";
import { RouteFactory } from "../../Factory/RouteFactory";
import { StockController } from "../../../Infrastructure/StockController";

const routeFactory = Container.get(RouteFactory);
export const stockRoute = [
  routeFactory.createPostRoute("/api/stock/add", "add", StockController),
  routeFactory.createGetRoute(
    "/api/stock/deleteStock/:id",
    "deleteStock",
    StockController
  ),
  routeFactory.createGetRoute("/api/stock/liste", "liste", StockController),
  routeFactory.createGetRoute(
    "/api/stock/deletePerime/:id",
    "deletePerime",
    StockController
  ),
  routeFactory.createGetRoute(
    "/api/stock/listePerime",
    "listePerime",
    StockController
  ),
  routeFactory.createPostRoute(
    "/api/stock/setResteTo",
    "setResteTo",
    StockController
  ),
  routeFactory.createPostRoute("/api/stock/search", "search", StockController),
  routeFactory.createPostRoute(
    "/api/stock/searchPerime",
    "searchPerime",
    StockController
  ),
];
