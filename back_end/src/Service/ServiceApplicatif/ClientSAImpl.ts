import { User } from "../../Donnees/DomainObject/User";
import { UserFactory } from "../../Contrainte/Factory/UserFactory";
import { Container, Service } from "typedi";
import { UserSMImpl } from "../ServiceMetier/UserSMImpl";
import { JwtUtility } from "../../Commun/Token/JwtUtility";
import { ErrorResponseDto } from "../../Donnees/DataTransfertObject/ResponseDto";
import { Client } from "../../Donnees/DomainObject/Client";
import { DeleteResult } from "typeorm";
import { ClientSMImpl } from "../ServiceMetier/ClientSMImpl";

export interface ClientSAAci {
  add(client: Client): Promise<Client>;
  liste(): Promise<Client[]>;
  deleteClient(id: number): Promise<DeleteResult>;
  getAllName(): Promise<Client[]>;
  getItem(id: number): Promise<Client>;
}

@Service()
export class ClientSAImpl implements ClientSAAci {
  // userFactory: UserFactory = Container.get(UserFactory);
  clientSM: ClientSMImpl = Container.get(ClientSMImpl);

  add(client: Client): Promise<Client> {
    return this.clientSM.add(client);
  }

  liste() {
    return this.clientSM.liste();
  }

  deleteClient(id: number): Promise<DeleteResult> {
    return this.clientSM.deleteClient(id);
  }
  getAllName(): Promise<Client[]> {
    return this.clientSM.getAllName();
  }
  getItem(id: number): Promise<Client> {
    return this.clientSM.getItem(id);
  }
}
