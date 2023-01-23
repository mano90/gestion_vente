import { Service } from "typedi";
import { ProduitStock } from "../../Donnees/DataTransfertObject/ProduitStock";
import { Produit } from "../../Donnees/DomainObject/Produit";

export interface ProduitWithStockFactoryAci {
  format(produit: Produit, stock: number, hasStock: boolean): ProduitStock;
  formatWithoutBoolean(produit: Produit, stock: number): ProduitStock;
}

@Service()
export class ProduitWithStockFactory implements ProduitWithStockFactoryAci {
  format(produit: Produit, stock: number, hasStock: boolean): ProduitStock {
    let produitStock: ProduitStock = new ProduitStock();
    produitStock.reference = produit.reference;
    produitStock.nom = produit.nom;
    produitStock.prix = produit.prix;
    produitStock.typeProduit = produit.typeProduit;
    produitStock.nombrePacket = produit.nombrePacket;
    produitStock.carton = produit.carton;
    produitStock.path = produit.path;
    produitStock.stock = stock;
    produitStock.hasStock = hasStock;

    return produitStock;
  }
  formatWithoutBoolean(produit: Produit, stock: number): ProduitStock {
    let produitStock: ProduitStock = new ProduitStock();
    produitStock.reference = produit.reference;
    produitStock.nom = produit.nom;
    produitStock.prix = produit.prix;
    produitStock.typeProduit = produit.typeProduit;
    produitStock.nombrePacket = produit.nombrePacket;
    produitStock.carton = produit.carton;
    produitStock.path = produit.path;
    produitStock.stock = stock;

    return produitStock;
  }
}
