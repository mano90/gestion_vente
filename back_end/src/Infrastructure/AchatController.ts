import { Container } from "typedi";
import { Request, Response } from "express";
import {
  ErrorResponseDto,
  SuccessResponseDto,
} from "../Donnees/DataTransfertObject/ResponseDto";
import { AchatSAImpl } from "../Service/ServiceApplicatif/AchatSAImpl";

export class AchatController {
  achatSA: AchatSAImpl = Container.get(AchatSAImpl);

  async addNew(req: Request, resp: Response) {
    try {
      const achat: any = await this.achatSA.addNew(req.body);
      resp.status(200).send(achat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async liste(req: Request, resp: Response) {
    try {
      const achat: any[] = await this.achatSA.liste();
      resp.status(200).send(achat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async getFacture(req: Request, resp: Response) {
    try {
      const achat: any = await this.achatSA.getFacture(req.body);
      resp.status(200).send(achat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }
}
