import { Container } from "typedi";
import { RouteFactory } from "../../Factory/RouteFactory";
import { BilanController } from "../../../Infrastructure/BilanController";

const routeFactory = Container.get(RouteFactory);
export const bilanRoute = [
  // routeFactory.createPostRoute(
  //   "/api/achat/getFacture",
  //   "getFacture",
  //   AchatController
  // ),
  routeFactory.createGetRoute(
    "/api/bilan/recette/:annee?",
    "recette",
    BilanController
  ),
  routeFactory.createGetRoute(
    "/api/bilan/entryQuantiteByMonths/:annee?",
    "entryQuantiteByMonths",
    BilanController
  ),
  routeFactory.createGetRoute(
    "/api/bilan/perimeQuantiteByMonths/:annee?",
    "perimeQuantiteByMonths",
    BilanController
  ),

  routeFactory.createGetRoute(
    "/api/bilan/sellProductsByMonths/:annee?",
    "sellProductsByMonths",
    BilanController
  ),

  routeFactory.createGetRoute(
    "/api/bilan/sortProductsByMostSell/:annee?",
    "sortProductsByMostSell",
    BilanController
  ),
  routeFactory.createPostRoute(
    "/api/bilan/sortProductsByMostSellWithDates",
    "sortProductsByMostSellWithDates",
    BilanController
  ),
];
