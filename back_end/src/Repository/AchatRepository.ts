import { Service } from "typedi";
import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { Sum } from "../Donnees/DataTransfertObject/Sum";
import { Achat } from "../Donnees/DomainObject/Achat";

export interface AchatRepositoryAci {
  add(achat: Achat): Promise<Achat>;
  listeDates(): Promise<Achat[]>;
  getIdClient(date: Date): Promise<Achat>;
  getMontantTotal(date: Date): Promise<Sum>;
  getByDateWithId(date: Date, id: number): Promise<Achat[]>;
  getByDateWithoutId(date: Date): Promise<Achat[]>;
  getSumRecette(year: number, month: number): Promise<Sum>;
  getNumberSell(reference: string): Promise<Sum>;
  getNumberSellWithDates(
    reference: string,
    dateDebut: Date,
    dateFin: Date
  ): Promise<Sum>;
  getSumSelledByMonth(
    year: number,
    month: number,
    reference: string
  ): Promise<Sum>;
}

@Service()
@EntityRepository(Achat)
export class AchatRepository
  extends Repository<Achat>
  implements AchatRepositoryAci
{
  add(achat: Achat): Promise<Achat> {
    return this.save(achat);
  }
  listeDates(): Promise<Achat[]> {
    return this.createQueryBuilder("achat")
      .select("DISTINCT achat.date")
      .orderBy("achat.date", "DESC")
      .getRawMany();
  }
  getIdClient(date: Date): Promise<Achat> {
    return this.createQueryBuilder("achat")
      .leftJoinAndSelect("achat.client", "client")
      .where("achat.date= :date", { date: date })
      .getOne();
  }

  getMontantTotal(date: Date): Promise<Sum> {
    return this.createQueryBuilder("achat")
      .where("achat.date= :date", { date: date })
      .select("SUM(achat.total)", "sum")
      .getRawOne();
  }
  getByDateWithId(date: Date, id: number): Promise<Achat[]> {
    return this.createQueryBuilder("achat")
      .where("achat.date= :date", { date: date })
      .andWhere("achat.id_client= :id_client", { id_client: id })
      .leftJoinAndSelect("achat.reference", "produit")
      .leftJoinAndSelect("achat.client", "client")
      .getMany();
  }
  getByDateWithoutId(date: Date): Promise<Achat[]> {
    return this.createQueryBuilder("achat")
      .where("achat.date= :date", { date: date })
      .andWhere("achat.id_client is NULL")
      .leftJoinAndSelect("achat.reference", "produit")
      .getMany();
  }

  getSumRecette(year: number, month: number): Promise<Sum> {
    return this.createQueryBuilder("achat")
      .where("MONTH(achat.date)= :month", { month: month })
      .andWhere("Year(achat.date)= :year", { year: year })
      .select("SUM(achat.total)", "sum")
      .getRawOne();
  }
  getNumberSell(reference: string): Promise<Sum> {
    return this.createQueryBuilder("achat")
      .where("achat.reference= :reference", { reference: reference })
      .select("SUM(achat.quantite)", "sum")
      .getRawOne();
  }
  getNumberSellWithDates(
    reference: string,
    dateDebut: Date,
    dateFin: Date
  ): Promise<Sum> {
    return this.createQueryBuilder("achat")
      .where("achat.reference= :reference", { reference: reference })
      .andWhere("achat.date <= :dateFin", { dateFin: dateFin })
      .andWhere("achat.date >= :dateDebut", { dateDebut: dateDebut })
      .select("SUM(achat.quantite)", "sum")
      .getRawOne();
  }
  getSumSelledByMonth(
    year: number,
    month: number,
    reference: string
  ): Promise<Sum> {
    return this.createQueryBuilder("achat")
      .where("achat.reference= :reference", { reference: reference })
      .andWhere("MONTH(achat.date)= :month", { month: month })
      .andWhere("Year(achat.date)= :year", { year: year })
      .select("SUM(achat.quantite)", "sum")
      .getRawOne();
  }
}
