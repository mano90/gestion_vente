import { User } from "../../Donnees/DomainObject/User";
import { UserFactory } from "../../Contrainte/Factory/UserFactory";
import { Container, Service } from "typedi";
import { UserSMImpl } from "../ServiceMetier/UserSMImpl";
import { JwtUtility } from "../../Commun/Token/JwtUtility";
import { ErrorResponseDto } from "../../Donnees/DataTransfertObject/ResponseDto";
import { Stock } from "../../Donnees/DomainObject/Stock";
import { DeleteResult, UpdateResult } from "typeorm";
import { StockSMImpl } from "../ServiceMetier/StockSMImpl";
import { StockQuantiteReste } from "../../Donnees/DataTransfertObject/StockQuantiteReste";
import { StockListe } from "../../Donnees/DataTransfertObject/StockListe";

export interface StockSAAci {
  add(stock: Stock): Promise<Stock>;
  liste(): Promise<Stock[]>;
  listePerime(): Promise<Stock[]>;

  deleteStock(id: number): Promise<DeleteResult>;
  setResteTo(id: number, reste: number): Promise<number>;
  // search(
  //   reference: string | null,
  //   dateDebut: Date | null,
  //   dateFin: Date | null,
  //   typeProduit: boolean | null
  // ): Promise<Stock[]>;
  search(
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): any;
  searchPerime(
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): Promise<Stock[]>;
  deletePerime(id: number): Promise<DeleteResult>;
}

@Service()
export class StockSAImpl implements StockSAAci {
  // userFactory: UserFactory = Container.get(UserFactory);
  stockSM: StockSMImpl = Container.get(StockSMImpl);

  async add(stock: Stock): Promise<Stock> {
    stock.reste = stock.quantite;
    // add(stock: Stock): any {
    const exist: StockQuantiteReste = await this.stockSM.verifyExist(stock);
    if (exist) {
      stock.quantite += exist.quantite;
      stock.reste += exist.quantite;
      stock.id = exist.id;
    }
    return this.stockSM.add(stock);
  }

  private dateDiffInDays(datePeremption: Date): number {
    let differenceInTime: number =
      datePeremption.getTime() - new Date().getTime();
    differenceInTime = differenceInTime / (1000 * 3600 * 24);
    return Math.abs(Math.round(differenceInTime));
  }

  async liste() {
    const liste: StockListe[] = [];
    let liste1: StockListe[] = await this.stockSM.listeNonPerime();
    for (let i = 0; i < liste1.length; i++) {
      const difference = this.dateDiffInDays(
        new Date(liste1[i].datePeremption)
      );
      if (difference <= 30) {
        liste1[i].notification = 2;
      } else if (difference <= 60) {
        liste1[i].notification = 1;
      } else {
        liste1[i].notification = 0;
      }
    }
    liste.push(...liste1);
    const liste2: StockListe[] = await this.stockSM.listeNonPermimable();
    liste.push(...liste2);
    return liste;

    // return this.stockSM.liste();
    // const dateNow: Date = new Date();
    // const liste: Stock[] = await this.stockSM.liste();
    // // for (let i = 0; i < liste.length; i++) {}

    // // const liste: Produit[] = await this.produitSM.liste();
    // let listeAll: StockListe[] = [];

    // for (let i = 0; i < liste.length; i++) {
    //   let stock: number = 0;

    //   if (liste[i].typeProduit == false) {
    //     const stock1: any = await this.stockSM.getStockPerissable(
    //       liste[i].reference
    //     );
    //     if (stock1.sum == null) {
    //       stock = 0;
    //     } else {
    //       stock = stock1.sum;
    //     }
    //   } else {
    //     const stock1: any = await this.stockSM.getStockMateriel(
    //       liste[i].reference
    //     );
    //     if (stock1.sum == null) {
    //       stock = 0;
    //     } else {
    //       stock = stock1.sum;
    //     }
    //   }

    //   listeAll.push(this.ProduitWithStockFactory.format(liste[i], stock));
    // }
    // return listeAll;
  }

  listePerime() {
    return this.stockSM.listePerime();
  }

  deleteStock(id: number): Promise<DeleteResult> {
    return this.stockSM.deleteStock(id);
  }

  setResteTo(id: number, reste: number): Promise<number> {
    return this.stockSM.setResteTo(id, reste);
  }
  // search(
  //   reference: string | null,
  //   dateDebut: Date | null,
  //   dateFin: Date | null,
  //   typeProduit: boolean | null
  // ): Promise<Stock[]> {
  //   return this.stockSM.search(reference, dateDebut, dateFin, typeProduit);
  // }

  search(
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): any {
    return this.stockSM.search(
      reference || null,
      dateDebut || null,
      dateFin || null,
      typeProduit || null
    );
  }
  searchPerime(
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): Promise<Stock[]> {
    return this.stockSM.searchPerime(
      reference || null,
      dateDebut || null,
      dateFin || null,
      typeProduit || null
    );
  }
  deletePerime(id: number): Promise<DeleteResult> {
    return this.stockSM.deletePerime(id);
  }
}
