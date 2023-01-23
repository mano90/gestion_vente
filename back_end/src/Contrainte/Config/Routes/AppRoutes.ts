import { userRoute } from "./UserRoute";
import { clientRoute } from "./ClientRoute";
import { produitRoute } from "./ProduitRoute";
import { stockRoute } from "./StockRoute";
import { achatRoute } from "./AchatRoute";
import { bilanRoute } from "./BilanRoute";
import { cacheRoute } from "./CacheRoute";
export const Routes = [
  ...userRoute,
  ...clientRoute,
  ...produitRoute,
  ...stockRoute,
  ...achatRoute,
  ...bilanRoute,
  ...cacheRoute,
];
