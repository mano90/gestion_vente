import { Service } from "typedi";
import { DeleteResult } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Sum } from "../../Donnees/DataTransfertObject/Sum";
import { Achat } from "../../Donnees/DomainObject/Achat";
import { AchatRepository } from "../../Repository/AchatRepository";

export interface AchatSMAci {
  add(achat: Achat): Promise<Achat>;
  listeDates(): Promise<Achat[]>;
  getIdClient(date: Date): Promise<Achat>;
  getMontantTotal(date: Date): Promise<Sum>;
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
export class AchatSMImpl implements AchatSMAci {
  @InjectRepository()
  achatRepository: AchatRepository;

  add(achat: Achat): Promise<Achat> {
    return this.achatRepository.add(achat);
  }
  listeDates(): Promise<Achat[]> {
    return this.achatRepository.listeDates();
  }
  getIdClient(date: Date): Promise<Achat> {
    return this.achatRepository.getIdClient(date);
  }
  getMontantTotal(date: Date): Promise<Sum> {
    return this.achatRepository.getMontantTotal(date);
  }
  getByDateWithId(date: Date, id: number): Promise<Achat[]> {
    return this.achatRepository.getByDateWithId(date, id);
  }
  getByDateWithoutId(date: Date): Promise<Achat[]> {
    return this.achatRepository.getByDateWithoutId(date);
  }
  getSumRecette(year: number, month: number): Promise<Sum> {
    return this.achatRepository.getSumRecette(year, month);
  }
  getNumberSell(reference: string): Promise<Sum> {
    return this.achatRepository.getNumberSell(reference);
  }
  getNumberSellWithDates(
    reference: string,
    dateDebut: Date,
    dateFin: Date
  ): Promise<Sum> {
    return this.achatRepository.getNumberSellWithDates(
      reference,
      dateDebut,
      dateFin
    );
  }
  getSumSelledByMonth(
    year: number,
    month: number,
    reference: string
  ): Promise<Sum> {
    return this.achatRepository.getSumSelledByMonth(year, month, reference);
  }
}
