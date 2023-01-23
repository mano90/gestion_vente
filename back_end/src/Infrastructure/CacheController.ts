import { Container } from "typedi";
import { Request, Response } from "express";
import {
  ErrorResponseDto,
  SuccessResponseDto,
} from "../Donnees/DataTransfertObject/ResponseDto";
import { AchatSAImpl } from "../Service/ServiceApplicatif/AchatSAImpl";
import { ProduitSAImpl } from "../Service/ServiceApplicatif/ProduitSAImpl";

export class CacheController {
  produitSA: ProduitSAImpl = Container.get(ProduitSAImpl);
  async deleteCache(req: Request, resp: Response) {
    try {
      const toReturn = this.produitSA.deleteCache();
      resp.status(200).send(toReturn);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }
  async getCache(req: Request, resp: Response) {
    try {
      const toReturn = await this.produitSA.getCache();
      // console.log(toReturn);
      resp.status(200).send(toReturn);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async cache(req: Request, resp: Response) {
    try {
      const toReturn = await this.produitSA.cache(req.body);
      resp.status(200).send(toReturn);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }
}
