import { Service } from "typedi";
import { DeleteResult } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { Client } from "../../Donnees/DomainObject/Client";
import { ClientRepository } from "../../Repository/ClientRepository";

export interface ClientSMAci {
  add(client: Client): Promise<Client>;
  liste(): Promise<Client[]>;
  deleteClient(id: number): Promise<DeleteResult>;
  getItem(id: number): Promise<Client>;
  getAllName(): Promise<Client[]>;
}

@Service()
export class ClientSMImpl implements ClientSMAci {
  @InjectRepository()
  clientRepository: ClientRepository;

  add(client: Client): Promise<Client> {
    return this.clientRepository.add(client);
  }

  liste(): Promise<Client[]> {
    return this.clientRepository.liste();
  }

  async deleteClient(id: number): Promise<DeleteResult> {
    return this.clientRepository.deleteClient(id);
  }
  getItem(id: number): Promise<Client> {
    return this.clientRepository.getItem(id);
  }
  getAllName(): Promise<Client[]> {
    return this.clientRepository.getAllName();
  }
}
