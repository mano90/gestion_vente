import { SSL_OP_SSLREF2_REUSE_CERT_TYPE_BUG } from "constants";
import { Container, Service } from "typedi";
import { PanierItemFactory } from "../../Contrainte/Factory/PanierItemFactory";
import { AchatItem } from "../../Donnees/DataTransfertObject/AchatItem";
import { PanierItem } from "../../Donnees/DataTransfertObject/PanierItem";
import { Sum } from "../../Donnees/DataTransfertObject/Sum";
import { Achat } from "../../Donnees/DomainObject/Achat";
import { Client } from "../../Donnees/DomainObject/Client";
import { Produit } from "../../Donnees/DomainObject/Produit";
import { Stock } from "../../Donnees/DomainObject/Stock";
import { AchatSMImpl } from "../ServiceMetier/AchatSMImpl";
import { ClientSMImpl } from "../ServiceMetier/ClientSMImpl";
import { ProduitSMImpl } from "../ServiceMetier/ProduitSMImpl";
import { StockSMImpl } from "../ServiceMetier/StockSMImpl";

export interface AchatSAAci {
  add(achat: Achat): Promise<Achat>;
  addNew(data: any): Promise<boolean>;
  liste(): Promise<AchatItem[]>;
  getFacture(data: any): Promise<Achat[]>;
}

@Service()
export class AchatSAImpl implements AchatSAAci {
  achatSM: AchatSMImpl = Container.get(AchatSMImpl);
  produitSM: ProduitSMImpl = Container.get(ProduitSMImpl);
  clientSM: ClientSMImpl = Container.get(ClientSMImpl);
  stockSM: StockSMImpl = Container.get(StockSMImpl);
  panierItemFactory: PanierItemFactory = Container.get(PanierItemFactory);
  add(achat: Achat): Promise<Achat> {
    return this.achatSM.add(achat);
  }

  async liste(): Promise<AchatItem[]> {
    const toReturn: AchatItem[] = [];
    const dates: Achat[] = await this.achatSM.listeDates();
    for (let i = 0; i < dates.length; i++) {
      const item1: AchatItem = new AchatItem();
      item1.date = dates[i].date;
      const montant: Sum = await this.achatSM.getMontantTotal(dates[i].date);

      item1.montant = montant.sum;
      const clientAchat: Achat = await this.achatSM.getIdClient(dates[i].date);
      item1.client = clientAchat.client;
      toReturn.push(item1);
    }
    return toReturn;
  }

  async addNew(data: any): Promise<boolean> {
    let id: number | null;
    if (data.id !== undefined) {
      id = data.id;
    } else {
      id = null;
    }

    const date: Date = new Date();
    for (let i = 0; i < data.produit.length; i++) {
      const panierItem: PanierItem = this.panierItemFactory.format(
        data.produit[i]
      );
      const produit: Produit = await this.produitSM.getItem(
        panierItem.reference
      );
      const client: Client = await this.clientSM.getItem(id);
      const achat: Achat = {
        date: date,
        reference: produit,
        client: client,
        nombre: panierItem.nombre,
        quantite: panierItem.quantite,
        total: panierItem.total,
        typeAchat: panierItem.typeAchat,
      };
      const changement = this.achatSM.add(achat);
      if (changement) {
        while (panierItem.quantite * 1 > 0) {
          let dateMinItem: Stock = new Stock();
          if (achat.reference.typeProduit == false) {
            dateMinItem = await this.stockSM.getDateMinProduit(
              panierItem.reference
            );
          } else {
            dateMinItem = await this.stockSM.getDateMinMateriel(
              panierItem.reference
            );
          }
          if (dateMinItem) {
            let lastItem: Stock;
            if (dateMinItem.datePeremption)
              lastItem = await this.stockSM.getMinDateIdPeremption(
                panierItem.reference,
                dateMinItem.datePeremption
              );
            else
              lastItem = await this.stockSM.getMinDateIdMateriel(
                panierItem.reference
              );
            if (lastItem) {
              console.log("farany");
              if (lastItem.reste * 1 < panierItem.quantite * 1) {
                await this.stockSM.setResteTo(lastItem.id, 0);
                panierItem.quantite = panierItem.quantite - lastItem.reste * 1;
              } else {
                const reste = lastItem.reste * 1 - panierItem.quantite;
                await this.stockSM.setResteTo(lastItem.id, reste);
                panierItem.quantite = 0;
              }
            }
          }
        }
      }
    }
    if (data.produit.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async getFacture(data: any): Promise<Achat[]> {
    let liste: Achat[] = [];
    if (data.id == null) {
      liste = await this.achatSM.getByDateWithoutId(new Date(data.date));
    } else {
      liste = await this.achatSM.getByDateWithId(new Date(data.date), data.id);
    }
    return liste;
  }
}
