import { Service } from "typedi";
import { PanierItem } from "../../Donnees/DataTransfertObject/PanierItem";
import { ProduitStock } from "../../Donnees/DataTransfertObject/ProduitStock";
import { Produit } from "../../Donnees/DomainObject/Produit";

export interface PanierItemFactoryAci {
  // format(produit: Produit, stock: number, hasStock: boolean): PanierItem;
}

@Service()
export class PanierItemFactory implements PanierItemFactoryAci {
  // format(data: any): PanierItem {
  format(data: any): any {
    let item: PanierItem = new PanierItem();
    item.reference = data.reference;
    item.nombre = data.nombre;
    item.total = data.total;
    item.typeAchat = data.typeAchat;
    item.quantite = data.quantite;
    return item;
  }
}
