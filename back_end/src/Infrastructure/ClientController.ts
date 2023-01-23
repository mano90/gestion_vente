import { Container } from "typedi";
import { Request, Response } from "express";
import {
  ErrorResponseDto,
  SuccessResponseDto,
} from "../Donnees/DataTransfertObject/ResponseDto";
import { UserValidator } from "../Contrainte/Validator/UserValidator";
import { ClientSAImpl } from "../Service/ServiceApplicatif/ClientSAImpl";
import { Client } from "../Donnees/DomainObject/Client";
import { DeleteResult } from "typeorm";
import { JwtUtility } from "../Commun/Token/JwtUtility";

export class ClientController {
  clientSA: ClientSAImpl = Container.get(ClientSAImpl);
  userValidator: UserValidator = Container.get(UserValidator);
  jwtUtility: JwtUtility = Container.get(JwtUtility);

  async liste(req: Request, resp: Response) {
    try {
      const listeClients: Client[] = await this.clientSA.liste();
      resp.status(200).send(listeClients);
    } catch (e) {
      resp.status(500).send((e.toString(), true));
    }
  }

  async add(req: Request, resp: Response) {
    try {
      const clientSaved = await this.clientSA.add(req.body);
      resp.status(200).send(clientSaved);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async deleteClient(req: Request, resp: Response) {
    try {
      const resultat: DeleteResult = await this.clientSA.deleteClient(
        +req.params.id
      );
      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async getAllName(req: Request, resp: Response) {
    try {
      const resultat: Client[] = await this.clientSA.getAllName();
      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async getItem(req: Request, resp: Response) {
    try {
      const resultat: Client = await this.clientSA.getItem(+req.params.id);
      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }
}
