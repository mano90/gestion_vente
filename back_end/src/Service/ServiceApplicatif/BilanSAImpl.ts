import { Container, Service } from "typedi";
import { Chart } from "../../Donnees/DataTransfertObject/Chart";
import { LabelData } from "../../Donnees/DataTransfertObject/LabelData";
import { ProduitReferenceNom } from "../../Donnees/DataTransfertObject/ProduitReferenceNom";
import { Sum } from "../../Donnees/DataTransfertObject/Sum";
import { AchatSMImpl } from "../ServiceMetier/AchatSMImpl";
import { ProduitSMImpl } from "../ServiceMetier/ProduitSMImpl";
import { StockSMImpl } from "../ServiceMetier/StockSMImpl";

export interface BilanSAAci {
  recette(annee?: number): Promise<number[]>;

  entryQuantiteByMonths(annee?: number): Promise<Chart[]>;
  perimeQuantiteByMonths(annee?: number): Promise<Chart[]>;
  sellProductsByMonths(annee?: number): Promise<Chart[]>;
  sortProductsByMostSell(annee?: number): Promise<LabelData[]>;
  sortProductsByMostSellWithDates(data: any): Promise<LabelData[]>;
}

@Service()
export class BilanSAImpl implements BilanSAAci {
  stockSM: StockSMImpl = Container.get(StockSMImpl);
  achatSM: AchatSMImpl = Container.get(AchatSMImpl);
  produitSM: ProduitSMImpl = Container.get(ProduitSMImpl);

  async recette(annee?: number): Promise<number[]> {
    let toSend: number[] = [];
    if (!annee) {
      const year = new Date().getFullYear();
      for (let i = 0; i <= 12; i++) {
        const vente: Sum = await this.achatSM.getSumRecette(year, i);
        if (vente.sum == null) {
          toSend.push(0);
        } else {
          toSend.push(vente.sum * 1);
        }
      }
    } else {
      for (let i = 0; i <= 12; i++) {
        const vente: Sum = await this.achatSM.getSumRecette(annee, i);
        if (vente.sum == null) {
          toSend.push(0);
        } else {
          toSend.push(vente.sum * 1);
        }
      }
    }
    return toSend;
  }

  async entryQuantiteByMonths(annee?: number): Promise<Chart[]> {
    let toSend: Chart[] = [];
    if (!annee) {
      const year: number = new Date().getFullYear();
      const reference: ProduitReferenceNom[] =
        await this.produitSM.getReference();
      // reference.forEach((element) => {
      for (let j = 0; j < reference.length; j++) {
        const dt: number[] = [];
        for (let i = 0; i <= 12; i++) {
          const quantite: Sum = await this.stockSM.getSumEntryByMonth(
            year,
            i,
            reference[j].reference
          );
          if (quantite.sum == null) {
            dt.push(0);
          } else {
            dt.push(quantite.sum);
          }
        }
        if (dt.every((item) => item === 0) == false) {
          const d: Chart = new Chart();
          d.data = dt;
          d.label = reference[j].nom;
          toSend.push(d);
        }
      }
    } else {
      const reference: ProduitReferenceNom[] =
        await this.produitSM.getReference();
      // reference.forEach((element) => {
      for (let j = 0; j < reference.length; j++) {
        const dt: number[] = [];
        for (let i = 0; i <= 12; i++) {
          const quantite: Sum = await this.stockSM.getSumEntryByMonth(
            annee,
            i,
            reference[j].reference
          );
          if (quantite.sum == null) {
            dt.push(0);
          } else {
            dt.push(quantite.sum);
          }
        }
        if (dt.every((item) => item === 0) == false) {
          const d: Chart = new Chart();
          d.data = dt;
          d.label = reference[j].nom;
          toSend.push(d);
        }
      }
      // });
    }
    return toSend;
  }

  async perimeQuantiteByMonths(annee?: number): Promise<Chart[]> {
    let toSend: Chart[] = [];
    if (!annee) {
      const year = new Date().getFullYear();
      const reference: ProduitReferenceNom[] =
        await this.produitSM.getReference();
      for (let j = 0; j < reference.length; j++) {
        const dt: number[] = [];
        for (let i = 0; i <= 12; i++) {
          const quantite: Sum = await this.stockSM.getSumPerimeByMonth(
            year,
            i,
            reference[j].reference
          );
          if (quantite.sum == null) {
            dt.push(0);
          } else {
            dt.push(quantite.sum);
          }
        }
        if (dt.every((item) => item === 0) == false) {
          const d: Chart = new Chart();
          d.data = dt;
          d.label = reference[j].nom;
          toSend.push(d);
        }
      }
    } else {
      const reference: ProduitReferenceNom[] =
        await this.produitSM.getReference();
      for (let j = 0; j < reference.length; j++) {
        const dt: number[] = [];
        for (let i = 0; i <= 12; i++) {
          const quantite: Sum = await this.stockSM.getSumPerimeByMonth(
            annee,
            i,
            reference[j].reference
          );
          if (quantite.sum == null) {
            dt.push(0);
          } else {
            dt.push(quantite.sum);
          }
        }
        if (dt.every((item) => item === 0) == false) {
          const d: Chart = new Chart();
          d.data = dt;
          d.label = reference[j].nom;
          toSend.push(d);
        }
      }
    }
    return toSend;
  }
  async sellProductsByMonths(annee?: number): Promise<Chart[]> {
    let toSend: Chart[] = [];
    if (!annee) {
      const year = new Date().getFullYear();
      const reference: ProduitReferenceNom[] =
        await this.produitSM.getReference();
      for (let j = 0; j < reference.length; j++) {
        const dt: number[] = [];
        for (let i = 0; i <= 12; i++) {
          const quantite: Sum = await this.achatSM.getSumSelledByMonth(
            year,
            i,
            reference[j].reference
          );
          if (quantite.sum == null) {
            dt.push(0);
          } else {
            dt.push(quantite.sum);
          }
        }
        if (dt.every((item) => item === 0) == false) {
          const d: Chart = new Chart();
          d.data = dt;
          d.label = reference[j].nom;
          toSend.push(d);
        }
      }
    } else {
      const reference: ProduitReferenceNom[] =
        await this.produitSM.getReference();
      for (let j = 0; j < reference.length; j++) {
        const dt: number[] = [];
        for (let i = 0; i <= 12; i++) {
          const quantite: Sum = await this.achatSM.getSumSelledByMonth(
            annee,
            i,
            reference[j].reference
          );
          if (quantite.sum == null) {
            dt.push(0);
          } else {
            dt.push(quantite.sum);
          }
        }
        if (dt.every((item) => item === 0) == false) {
          const d: Chart = new Chart();
          d.data = dt;
          d.label = reference[j].nom;
          toSend.push(d);
        }
      }
    }
    return toSend;
  }

  async sortProductsByMostSell(): Promise<LabelData[]> {
    let statistique: LabelData[] = [];
    const reference: ProduitReferenceNom[] =
      await this.produitSM.getReference();
    for (let j = 0; j < reference.length; j++) {
      const quantite: Sum = await this.achatSM.getNumberSell(
        reference[j].reference
      );
      if (quantite.sum != null) {
        const d: LabelData = new LabelData();
        d.label = reference[j].nom;
        d.data = quantite.sum;
        statistique.push(d);
      }
    }
    return statistique;
  }

  async sortProductsByMostSellWithDates(data: any): Promise<LabelData[]> {
    let statistique: LabelData[] = [];
    const dateDebut: Date = new Date(data.dateDebut);
    const dateFin: Date = new Date(data.dateFin);
    const reference: ProduitReferenceNom[] =
      await this.produitSM.getReference();
    for (let j = 0; j < reference.length; j++) {
      const quantite: Sum = await this.achatSM.getNumberSellWithDates(
        reference[j].reference,
        dateDebut,
        dateFin
      );
      if (quantite.sum != null) {
        const d: LabelData = new LabelData();
        d.label = reference[j].nom;
        d.data = quantite.sum;
        statistique.push(d);
      }
    }
    return statistique;
  }
}
