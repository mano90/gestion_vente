import { UserSAImpl } from "../Service/ServiceApplicatif/UserSAImpl";
import { Container } from "typedi";
import { Request, Response } from "express";
import {
  ErrorResponseDto,
  SuccessResponseDto,
} from "../Donnees/DataTransfertObject/ResponseDto";
import { UserValidator } from "../Contrainte/Validator/UserValidator";
import { User } from "../Donnees/DomainObject/User";

export class UserController {
  userSA: UserSAImpl = Container.get(UserSAImpl);
  userValidator: UserValidator = Container.get(UserValidator);

  async login(req: Request, resp: Response) {
    try {
      // console.log("=================");
      const dt = await this.userSA.insertDefaultData();
      if (dt) {
        let loginResult = await this.userSA.login(req.body);
        resp.status(200).send(loginResult);
      }
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  // async saveOrUpdateUser(req: Request, resp: Response) {
  //   try {
  //     let userAdded: User = await this.userSA.saveOrUpdateUser(req.body);
  //     userAdded.identifiant &&
  //       resp.status(200).send(new SuccessResponseDto(userAdded));
  //   } catch (e) {
  //     resp.status(500).send(new ErrorResponseDto(e.toString(), true));
  //   }
  // }
}
