import { Produit } from "../DomainObject/Produit";

export interface StockListe {
  id: number;
  reference: Produit;
  quantite: number;
  datePeremption?: string;
  dateEntree: string;
  reste: number;
  deleted: boolean;
  notification?: number;
}
