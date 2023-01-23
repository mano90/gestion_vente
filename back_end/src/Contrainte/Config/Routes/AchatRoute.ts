import { Container } from "typedi";
import { RouteFactory } from "../../Factory/RouteFactory";
import { AchatController } from "../../../Infrastructure/AchatController";

const routeFactory = Container.get(RouteFactory);
export const achatRoute = [
  routeFactory.createPostRoute("/api/achat/addNew", "addNew", AchatController),
  routeFactory.createPostRoute(
    "/api/achat/getFacture",
    "getFacture",
    AchatController
  ),
  routeFactory.createGetRoute("/api/achat/liste", "liste", AchatController),
];
