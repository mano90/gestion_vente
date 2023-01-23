import { Container } from "typedi";
import { Request, Response } from "express";
import {
  ErrorResponseDto,
  SuccessResponseDto,
} from "../Donnees/DataTransfertObject/ResponseDto";
import { BilanSAImpl } from "../Service/ServiceApplicatif/BilanSAImpl";
import { Chart } from "../Donnees/DataTransfertObject/Chart";
import { LabelData } from "../Donnees/DataTransfertObject/LabelData";

export class BilanController {
  bilanSa: BilanSAImpl = Container.get(BilanSAImpl);

  async recette(req: Request, resp: Response) {
    try {
      let resultat: number[];
      if (req.params.annee)
        resultat = await this.bilanSa.recette(+req.params.annee);
      else resultat = await this.bilanSa.recette();

      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async entryQuantiteByMonths(req: Request, resp: Response) {
    try {
      let resultat: Chart[];
      if (req.params.annee)
        resultat = await this.bilanSa.entryQuantiteByMonths(+req.params.annee);
      else resultat = await this.bilanSa.entryQuantiteByMonths();

      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async perimeQuantiteByMonths(req: Request, resp: Response) {
    try {
      let resultat: Chart[];
      if (req.params.annee)
        resultat = await this.bilanSa.perimeQuantiteByMonths(+req.params.annee);
      else resultat = await this.bilanSa.perimeQuantiteByMonths();

      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async sellProductsByMonths(req: Request, resp: Response) {
    try {
      let resultat: Chart[];
      if (req.params.annee)
        resultat = await this.bilanSa.sellProductsByMonths(+req.params.annee);
      else resultat = await this.bilanSa.sellProductsByMonths();

      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async sortProductsByMostSell(req: Request, resp: Response) {
    try {
      const resultat: LabelData[] = await this.bilanSa.sortProductsByMostSell();
      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async sortProductsByMostSellWithDates(req: Request, resp: Response) {
    try {
      const resultat: LabelData[] =
        await this.bilanSa.sortProductsByMostSellWithDates(req.body);
      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }
}
