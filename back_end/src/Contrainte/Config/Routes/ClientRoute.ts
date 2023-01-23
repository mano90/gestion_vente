import { Container } from "typedi";
import { RouteFactory } from "../../Factory/RouteFactory";
import { ClientController } from "../../../Infrastructure/ClientController";

const routeFactory = Container.get(RouteFactory);
export const clientRoute = [
  routeFactory.createPostRoute("/api/client/add", "add", ClientController),
  routeFactory.createGetRoute(
    "/api/client/deleteClient/:id",
    "deleteClient",
    ClientController
  ),
  routeFactory.createGetRoute("/api/client/liste", "liste", ClientController),
  routeFactory.createGetRoute(
    "/api/client/getAllName",
    "getAllName",
    ClientController
  ),
  routeFactory.createGetRoute(
    "/api/client/getItem/:id",
    "getItem",
    ClientController
  ),
];
