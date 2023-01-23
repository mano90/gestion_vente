import { Container } from "typedi";
import { Request, Response } from "express";
import {
  ErrorResponseDto,
  SuccessResponseDto,
} from "../Donnees/DataTransfertObject/ResponseDto";
import { UserValidator } from "../Contrainte/Validator/UserValidator";
import { StockSAImpl } from "../Service/ServiceApplicatif/StockSAImpl";
import { Stock } from "../Donnees/DomainObject/Stock";
import { DeleteResult } from "typeorm";
import { JwtUtility } from "../Commun/Token/JwtUtility";

export class StockController {
  stockSA: StockSAImpl = Container.get(StockSAImpl);
  userValidator: UserValidator = Container.get(UserValidator);
  jwtUtility: JwtUtility = Container.get(JwtUtility);

  async add(req: Request, resp: Response) {
    try {
      const stockSaved = await this.stockSA.add(req.body);
      resp.status(200).send(stockSaved);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async liste(req: Request, resp: Response) {
    try {
      const listeStocks: Stock[] = await this.stockSA.liste();
      console.log(listeStocks);
      resp.status(200).send(listeStocks);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }
  async listePerime(req: Request, resp: Response) {
    try {
      const listeStocks: Stock[] = await this.stockSA.listePerime();
      resp.status(200).send(listeStocks);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async deleteStock(req: Request, resp: Response) {
    try {
      const resultat: DeleteResult = await this.stockSA.deleteStock(
        +req.params.id
      );
      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async setResteTo(req: Request, resp: Response) {
    try {
      const resultat: any = await this.stockSA.setResteTo(
        req.body.id,
        req.body.reste
      );
      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async search(req: Request, resp: Response) {
    try {
      const listeSearch: Stock[] = await this.stockSA.search(
        req.body.referenceSearch,
        req.body.debutSearch,
        req.body.finSearch,
        req.body.typeProduitSearch
      );
      resp.status(200).send(listeSearch);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async searchPerime(req: Request, resp: Response) {
    try {
      const listeSearch: Stock[] = await this.stockSA.searchPerime(
        req.body.referenceSearch,
        req.body.debutSearch,
        req.body.finSearch,
        req.body.typeProduitSearch
      );
      resp.status(200).send(listeSearch);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async deletePerime(req: Request, resp: Response) {
    try {
      const deleted: DeleteResult = await this.stockSA.deletePerime(
        +req.params.id
      );
      resp.status(200).send(deleted);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }
}
