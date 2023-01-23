import { Service } from "typedi";
import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { Client } from "../Donnees/DomainObject/Client";

export interface ClientRepositoryAci {
  add(client: Client): Promise<Client>;
  liste(): Promise<Client[]>;
  deleteClient(id: number): Promise<DeleteResult>;
  getItem(id: number): Promise<Client>;
  getAllName(): Promise<Client[]>;
}

@Service()
@EntityRepository(Client)
export class ClientRepository
  extends Repository<Client>
  implements ClientRepositoryAci
{
  add(client: Client): Promise<Client> {
    return this.save(client);
  }

  liste(): Promise<Client[]> {
    return this.createQueryBuilder("client").getMany();
  }

  deleteClient(id: number): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .from("client")
      .where("id =:id", { id: id })
      .execute();
  }

  getItem(id: number): Promise<Client> {
    return this.createQueryBuilder("client")
      .where("client.id= :id", { id: id })
      .getOne();
  }

  getAllName(): Promise<Client[]> {
    return this.createQueryBuilder("client")
      .select(["client.id", "client.nom", "client.prenoms"])
      .getMany();
  }
}
