import { Service } from "typedi";
import { DeleteResult, UpdateResult } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { StockQuantiteReste } from "../../Donnees/DataTransfertObject/StockQuantiteReste";
import { Sum } from "../../Donnees/DataTransfertObject/Sum";
import { Stock } from "../../Donnees/DomainObject/Stock";
import { StockRepository } from "../../Repository/StockRepository";

export interface StockSMAci {
  liste(): Promise<Stock[]>;
  listeNonPermimable(): Promise<Stock[]>;
  listePerime(): Promise<Stock[]>;
  listeNonPerime(): Promise<Stock[]>;
  deletePerime(id: number): Promise<DeleteResult>;
  add(stock: Stock): Promise<Stock>;
  search(
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): Promise<Stock[]>;
  searchPerime(
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): Promise<Stock[]>;
  verifyExist(stock: Stock): Promise<StockQuantiteReste>;
  deleteStock(id: number): Promise<DeleteResult>;
  getStockPerissable(reference: string): Promise<number>;
  getStockMateriel(reference: string): Promise<number>;
  setResteTo(id: number, reste: number): Promise<number>;
  getDateMinProduit(reference: string): Promise<Stock>;
  getDateMinMateriel(reference: string): Promise<Stock>;
  getMinDateIdPeremption(reference: string, date: string): Promise<Stock>;
  getMinDateIdMateriel(reference: string): Promise<Stock>;
  // getMinDateId(reference: string, date: Date): Promise<Stock>;
  getSumEntryByMonth(
    year: number,
    month: number,
    reference: string
  ): Promise<Sum>;
  getSumPerimeByMonth(
    year: number,
    month: number,
    reference: string
  ): Promise<Sum>;
  getSumPerimeByMonthWithYear(
    year: number,
    month: number,
    reference: string,
    date: Date
  ): Promise<Sum>;
  getOne(reference: string): Promise<Stock>;
}

@Service()
export class StockSMImpl implements StockSMAci {
  @InjectRepository()
  stockRepository: StockRepository;

  liste(): Promise<Stock[]> {
    return this.stockRepository.liste();
  }

  listePerime(): Promise<Stock[]> {
    return this.stockRepository.listePerime(new Date());
  }

  listeNonPerime(): Promise<Stock[]> {
    return this.stockRepository.listeNonPerime(new Date());
  }

  listeNonPermimable(): Promise<Stock[]> {
    return this.stockRepository.listeNonPermimable();
  }

  deletePerime(id: number): Promise<DeleteResult> {
    return this.stockRepository.deletePerime(id);
    // return data;
  }

  search(
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): Promise<Stock[]> {
    return this.stockRepository.search(
      reference,
      dateDebut,
      dateFin,
      typeProduit
    );
  }

  searchPerime(
    reference: string | null,
    dateDebut: Date | null,
    dateFin: Date | null,
    typeProduit: boolean | null
  ): Promise<Stock[]> {
    return this.stockRepository.searchPerime(
      new Date(),
      reference,
      dateDebut,
      dateFin,
      typeProduit
    );
  }

  add(stock: Stock): Promise<Stock> {
    return this.stockRepository.add(stock);
  }

  deleteStock(id: number): Promise<DeleteResult> {
    return this.stockRepository.deleteStock(id);
  }

  getStockPerissable(reference: string): Promise<number> {
    return this.stockRepository.getStockPerissable(reference, new Date());
  }
  getStockMateriel(reference: string): Promise<number> {
    return this.stockRepository.getStockMateriel(reference);
  }

  verifyExist(stock: Stock): Promise<StockQuantiteReste> {
    return this.stockRepository.verifyExist(stock);
  }

  async setResteTo(id: number, reste: number): Promise<number> {
    const data: UpdateResult = await this.stockRepository.setResteTo(id, reste);
    return data.raw.changedRows;
  }

  getDateMinProduit(reference: string): Promise<Stock> {
    return this.stockRepository.getDateMinProduit(reference, new Date());
  }

  getDateMinMateriel(reference: string): Promise<Stock> {
    return this.stockRepository.getDateMinMateriel(reference);
  }

  getMinDateIdPeremption(reference: string, date: string): Promise<Stock> {
    return this.stockRepository.getMinDateIdPeremption(reference, date);
  }
  getMinDateIdMateriel(reference: string): Promise<Stock> {
    return this.stockRepository.getMinDateIdMateriel(reference);
  }

  getSumEntryByMonth(
    year: number,
    month: number,
    reference: string
  ): Promise<Sum> {
    return this.stockRepository.getSumEntryByMonth(year, month, reference);
  }

  getSumPerimeByMonth(
    year: number,
    month: number,
    reference: string
  ): Promise<Sum> {
    return this.stockRepository.getSumPerimeByMonth(
      year,
      month,
      reference,
      new Date()
    );
  }

  getSumPerimeByMonthWithYear(
    year: number,
    month: number,
    reference: string,
    date: Date
  ): Promise<Sum> {
    return this.stockRepository.getSumPerimeByMonth(
      year,
      month,
      reference,
      date
    );
  }
  getOne(reference: string): Promise<Stock> {
    return this.stockRepository.getOne(reference);
  }
}
