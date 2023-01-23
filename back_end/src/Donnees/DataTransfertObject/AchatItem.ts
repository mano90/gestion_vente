import { Client } from "../DomainObject/Client";

export class AchatItem {
  date: Date;
  client?: Client;
  montant: number;
}
