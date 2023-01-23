import { Container } from "typedi";
import { RouteFactory } from "../../Factory/RouteFactory";
import { ProduitController } from "../../../Infrastructure/ProduitController";

const routeFactory = Container.get(RouteFactory);
export const produitRoute = [
  routeFactory.createPostRoute("/api/produit/add", "add", ProduitController),
  routeFactory.createPostRoute(
    "/api/produit/update",
    "update",
    ProduitController
  ),
  routeFactory.createGetRoute(
    "/api/produit/deleteProduit/:reference",
    "deleteProduit",
    ProduitController
  ),
  routeFactory.createGetRoute("/api/produit/liste", "liste", ProduitController),
  routeFactory.createGetRoute(
    "/api/produit/getReference",
    "getReference",
    ProduitController
  ),
  routeFactory.createGetRoute(
    "/api/produit/getNameByReference/:reference",
    "getNameByReference",
    ProduitController
  ),
  routeFactory.createPostRoute(
    "/api/produit/uploadFile",
    "uploadFile",
    ProduitController
  ),
  routeFactory.createGetRoute(
    "/api/produit/deleteFile/:path",
    "deleteFile",
    ProduitController
  ),

  routeFactory.createGetRoute(
    "/produit/readFile/:image",
    "readFile",
    ProduitController
  ),

  routeFactory.createGetRoute(
    "/api/produit/getItem/:id",
    "getItem",
    ProduitController
  ),
];
