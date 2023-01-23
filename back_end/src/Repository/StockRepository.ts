import { Service } from "typedi";
import {
  DeleteResult,
  EntityRepository,
  Repository,
  UpdateResult,
} from "typeorm";
import { StockQuantiteReste } from "../Donnees/DataTransfertObject/StockQuantiteReste";
import { Sum } from "../Donnees/DataTransfertObject/Sum";
import { Stock } from "../Donnees/DomainObject/Stock";

export interface StockRepositoryAci {
  liste(): Promise<Stock[]>;

  listeNonPermimable(): Promise<Stock[]>;
  listePerime(datePeremption: Date): Promise<Stock[]>;
  listeNonPerime(datePeremption: Date): Promise<Stock[]>;
  deletePerime(id: number): Promise<DeleteResult>;
  add(stock: Stock): Promise<Stock>;
  search(
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): Promise<Stock[]>;
  searchPerime(
    date: Date,
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): Promise<Stock[]>;
  verifyExist(stock: Stock): Promise<StockQuantiteReste>;
  getOne(reference: string): Promise<Stock>;
  deleteStock(id: number): Promise<DeleteResult>;
  getStockPerissable(reference: string, datePeremption: Date): Promise<number>;
  getStockMateriel(reference: string): Promise<number>;
  setResteTo(id: number, reste: number): Promise<UpdateResult>;
  getDateMinProduit(reference: string, date: Date): Promise<Stock>;
  getDateMinMateriel(reference: string): Promise<Stock>;
  // getMinDateId(reference: string, date: Date): Promise<Stock>;
  getMinDateIdPeremption(reference: string, date: string): Promise<Stock>;
  getMinDateIdMateriel(reference: string): Promise<Stock>;
  getSumEntryByMonth(
    year: number,
    month: number,
    reference: string
  ): Promise<Sum>;
  getSumPerimeByMonth(
    year: number,
    month: number,
    reference: string,
    date: Date
  ): Promise<Sum>;
}

@Service()
@EntityRepository(Stock)
export class StockRepository
  extends Repository<Stock>
  implements StockRepositoryAci
{
  liste(): Promise<Stock[]> {
    return this.createQueryBuilder("stock").getMany();
  }

  listeNonPermimable(): Promise<Stock[]> {
    return this.createQueryBuilder("stock")
      .where("stock.datePeremption IS NULL")
      .getMany();
  }

  listePerime(datePeremption: Date): Promise<Stock[]> {
    return this.createQueryBuilder("stock")
      .where("stock.datePeremption IS NOT NULL")
      .andWhere("stock.deleted = false")
      .andWhere("stock.datePeremption < :datePeremption", {
        datePeremption: datePeremption,
      })
      .getMany();
  }

  listeNonPerime(datePeremption: Date): Promise<Stock[]> {
    return this.createQueryBuilder("stock")
      .where("stock.datePeremption IS NOT NULL")
      .andWhere("stock.datePeremption > :datePeremption", {
        datePeremption: datePeremption,
      })
      .getMany();
  }
  deletePerime(id: number): Promise<DeleteResult> {
    return this.createQueryBuilder("stock")
      .update("stock")
      .set({
        deleted: true,
      })
      .where("id = :id", { id: id })
      .execute();
  }

  add(stock: Stock): Promise<Stock> {
    return this.save(stock);
  }

  search(
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): Promise<Stock[]> {
    let query = this.createQueryBuilder("stock")
      .innerJoinAndSelect("stock.reference", "produit")
      .where("stock.quantite>0");
    if (reference != null)
      query = query.andWhere("stock.reference= :reference", {
        reference: reference,
      });
    if (typeProduit != null)
      query = query.andWhere("produit.typeProduit= :typeProduit", {
        typeProduit: typeProduit,
      });
    if (dateDebut != null)
      query = query.andWhere("stock.dateEntree>= :dateDebut", {
        dateDebut: dateDebut,
      });
    if (dateFin != null)
      query = query.andWhere("stock.dateEntree<= :dateFin", {
        dateFin: dateFin,
      });
    return query.getMany();
  }

  searchPerime(
    date: Date,
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): Promise<Stock[]> {
    let query = this.createQueryBuilder("stock")
      .innerJoinAndSelect("stock.reference", "produit")
      .where("stock.quantite>0")
      .andWhere("stock.datePeremption<= :datePeremption", {
        datePeremption: date,
      });
    if (reference != "")
      query = query.andWhere("stock.reference= :reference", {
        reference: reference,
      });
    if (typeProduit != undefined)
      query = query.andWhere("produit.typeProduit= :typeProduit", {
        typeProduit: typeProduit,
      });
    if (dateDebut)
      query = query.andWhere("stock.dateEntree>= :dateDebut", {
        dateDebut: dateDebut,
      });
    if (dateFin)
      query = query.andWhere("stock.dateEntree<= :dateFin", {
        dateFin: dateFin,
      });
    return query.getMany();
  }

  deleteStock(id: number): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .from("stock")
      .where("id =:id", { id: id })
      .execute();
  }

  verifyExist(stock: Stock): Promise<StockQuantiteReste> {
    if (stock.datePeremption) {
      return this.createQueryBuilder("stock")
        .where("stock.reference= :reference", { reference: stock.reference })
        .andWhere("stock.datePeremption= :datePeremption", {
          datePeremption: stock.datePeremption,
        })
        .andWhere("stock.dateEntree= :dateEntree", {
          dateEntree: stock.dateEntree,
        })
        .select(["stock.quantite", "stock.reste", "stock.id"])
        .getOne();
    } else {
      return this.createQueryBuilder("stock")
        .where("stock.reference= :reference", { reference: stock.reference })
        .andWhere("stock.dateEntree= :dateEntree", {
          dateEntree: stock.dateEntree,
        })
        .select(["stock.quantite", "stock.reste", "stock.id"])
        .getOne();
    }
  }

  getStockMateriel(reference: string): Promise<number> {
    return this.createQueryBuilder("stock")
      .where("stock.reference= :reference", { reference: reference })
      .select("SUM(stock.reste)", "sum")

      .getRawOne();
  }

  getStockPerissable(reference: string, datePeremption: Date): Promise<number> {
    return this.createQueryBuilder("stock")
      .where("stock.reference= :reference", { reference: reference })
      .andWhere("stock.datePeremption> :datePeremption", {
        datePeremption: datePeremption,
      })
      .select("SUM(stock.reste)", "sum")
      .getRawOne();
  }

  setResteTo(id: number, reste: number): Promise<UpdateResult> {
    return this.createQueryBuilder()
      .update("stock")
      .set({
        reste: reste,
      })
      .where("id = :id", { id: id })
      .execute();
  }

  getDateMinProduit(reference: string, date: Date): Promise<Stock> {
    return this.createQueryBuilder("stock")
      .where("stock.reference= :reference", { reference: reference })
      .andWhere("stock.reste> 0")

      .andWhere("stock.datePeremption IS NOT NULL")
      .andWhere("stock.datePeremption> :datePeremption", {
        datePeremption: date,
      })
      .getOne();
  }

  getDateMinMateriel(reference: string): Promise<Stock> {
    return this.createQueryBuilder("stock")
      .where("stock.reference= :reference", { reference: reference })
      .andWhere("stock.reste> 0")
      .andWhere("stock.datePeremption IS NULL")
      .getOne();
  }

  // getMinDateId(reference: string, date: Date): Promise<Stock> {
  getMinDateIdPeremption(reference: string, date: string): Promise<Stock> {
    return this.createQueryBuilder("stock")
      .where("stock.reference= :reference", { reference: reference })
      .andWhere("stock.reste> 0")
      .andWhere("stock.datePeremption IS NOT NULL")
      .andWhere("stock.datePeremption= :datePeremption", {
        datePeremption: date,
      })
      .getOne();
  }

  getMinDateIdMateriel(reference: string): Promise<Stock> {
    return (
      this.createQueryBuilder("stock")
        .where("stock.reference= :reference", { reference: reference })
        .andWhere("stock.reste> 0")
        // .andWhere("stock.datePeremption= :datePeremption", {
        //   datePeremption: date,
        // })
        .orderBy("stock.dateEntree", "DESC")
        .getOne()
    );
  }

  getSumEntryByMonth(
    year: number,
    month: number,
    reference: string
  ): Promise<Sum> {
    return this.createQueryBuilder("stock")
      .where("stock.reference= :reference", { reference: reference })
      .andWhere("Year(stock.dateEntree)= :yearDate", { yearDate: year })
      .andWhere("Month(stock.dateEntree)= :monthDate", { monthDate: month })
      .select("SUM(stock.quantite)", "sum")
      .getRawOne();
  }

  getSumPerimeByMonth(
    year: number,
    month: number,
    reference: string,
    date: Date
  ): Promise<Sum> {
    return this.createQueryBuilder("stock")
      .where("stock.reference= :reference", { reference: reference })
      .andWhere("Year(stock.datePeremption)= :yearDate", { yearDate: year })
      .andWhere("Month(stock.datePeremption)= :monthDate", { monthDate: month })
      .andWhere("stock.datePeremption IS NOT NULL")
      .andWhere("stock.datePeremption<= :datePeremption", {
        datePeremption: date,
      })
      .select("SUM(stock.reste)", "sum")
      .getRawOne();
  }

  getOne(reference: string): Promise<Stock> {
    return this.createQueryBuilder("stock")
      .where("stock.reference= :reference", { reference: reference })
      .getOne();
  }
}
