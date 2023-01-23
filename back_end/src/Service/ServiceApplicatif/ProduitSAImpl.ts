import { Container, Service } from "typedi";
import { Produit } from "../../Donnees/DomainObject/Produit";
import { DeleteResult } from "typeorm";
import { ProduitSMImpl } from "../ServiceMetier/ProduitSMImpl";
import { ProduitReferenceNom } from "../../Donnees/DataTransfertObject/ProduitReferenceNom";
import { ProduitNomTypeProduit } from "../../Donnees/DataTransfertObject/ProduitNomTypeProduit";
import { ProduitStock } from "../../Donnees/DataTransfertObject/ProduitStock";
import { StockSMImpl } from "../ServiceMetier/StockSMImpl";
import { ProduitWithStockFactory } from "../../Contrainte/Factory/ProduitWithStockFactory";
import { unlink } from "fs";
import { Stock } from "../../Donnees/DomainObject/Stock";
import { CacheItem } from "../../Donnees/DataTransfertObject/CacheItem";
const process = require("process");
const NodeCache = require("node-cache");
const myCache = new NodeCache();

export interface ProduitSAAci {
  add(produit: Produit): Promise<Produit | null>;
  liste(): Promise<ProduitStock[]>;
  deleteProduit(reference: string): Promise<DeleteResult>;
  getReference(): Promise<ProduitReferenceNom[]>;
  getNameByReference(reference: string): Promise<ProduitNomTypeProduit>;
  update(produit: Produit): Promise<Produit>;
  getItem(reference: string): Promise<ProduitStock>;
}

@Service()
export class ProduitSAImpl implements ProduitSAAci {
  // userFactory: UserFactory = Container.get(UserFactory);
  produitSM: ProduitSMImpl = Container.get(ProduitSMImpl);
  stockSM: StockSMImpl = Container.get(StockSMImpl);
  ProduitWithStockFactory: ProduitWithStockFactory = Container.get(
    ProduitWithStockFactory
  );

  async add(produit: Produit): Promise<Produit | null> {
    const prod: Produit = await this.produitSM.getItem(produit.reference);
    if (prod) {
      return null;
    } else {
      return this.produitSM.add(produit);
    }
  }
  update(produit: Produit): Promise<Produit> {
    return this.produitSM.add(produit);
  }

  async liste(): Promise<ProduitStock[]> {
    const liste: Produit[] = await this.produitSM.liste();
    let listeAll: ProduitStock[] = [];

    for (let i = 0; i < liste.length; i++) {
      let stock: number = 0;
      let hasStock: boolean = false;
      if (liste[i].typeProduit == false) {
        const stock1: any = await this.stockSM.getStockPerissable(
          liste[i].reference
        );
        if (stock1.sum == null) {
          const st: Stock = await this.stockSM.getOne(liste[i].reference);
          if (st) {
            hasStock = true;
          }
          stock = 0;
        } else {
          hasStock = true;
          stock = stock1.sum;
        }
      } else {
        const stock1: any = await this.stockSM.getStockMateriel(
          liste[i].reference
        );
        if (stock1.sum == null) {
          const st: Stock = await this.stockSM.getOne(liste[i].reference);
          if (st) {
            hasStock = true;
          }
          stock = 0;
        } else {
          hasStock = true;
          stock = stock1.sum;
        }
      }

      listeAll.push(
        this.ProduitWithStockFactory.format(liste[i], stock, hasStock)
      );
    }
    return listeAll;
  }

  async deleteProduit(reference: string): Promise<DeleteResult> {
    const produit: Produit = await this.produitSM.getItem(reference);
    if (produit) {
      const cwd: string = process.cwd() + "/uploads/" + produit.path;
      unlink(cwd, (err) => {
        if (err) {
          // console.log(err);
        }
      });
    }
    return this.produitSM.deleteProduit(reference);
  }

  getReference(): Promise<ProduitReferenceNom[]> {
    return this.produitSM.getReference();
  }
  getNameByReference(reference: string): Promise<ProduitNomTypeProduit> {
    return this.produitSM.getNameByReference(reference);
  }

  async getItem(reference: string): Promise<ProduitStock> {
    let stock = 0;
    let produit: Produit = await this.produitSM.getItem(reference);
    if (produit.typeProduit == false) {
      const stock1: any = await this.stockSM.getStockPerissable(
        produit.reference
      );
      if (stock1.sum == null) {
        stock = 0;
      } else {
        stock = stock1.sum;
      }
    } else {
      const stock1: any = await this.stockSM.getStockMateriel(reference);
      if (stock1.sum == null) {
        stock = 0;
      } else {
        stock = stock1.sum;
      }
    }
    return this.ProduitWithStockFactory.formatWithoutBoolean(produit, stock);
  }

  deleteCache(): any {
    myCache.del("cache");
    return true;
  }

  async getCache(): Promise<any> {
    const cacheItem = await myCache.get("cache");
    console.log(cacheItem);
    return cacheItem;
  }

  async cache(data: any): Promise<any> {
    // return data;
    let obj: CacheItem = new CacheItem();
    obj.reference = data.reference;
    obj.typeAchat = data.typeAchat;
    obj.nombre = data.nombre;
    const cacheItem = await myCache.get("cache");
    if (cacheItem) {
      let initial: string = JSON.stringify(cacheItem);
      if (initial.charAt(0) == "[") {
        initial = initial.substring(1, initial.length - 1);
      }
      const last: string = JSON.stringify(obj);
      let it: any = "[" + initial + "," + last + "]";
      it = JSON.parse(it);
      myCache.set("cache", it, 600);
    } else {
      myCache.set("cache", obj, 600);
    }
    const cache2 = await myCache.get("cache");
    console.log(cache2);
    return true;
  }
}
