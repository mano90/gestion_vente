import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Client } from "./Client";
import { Produit } from "./Produit";

@Entity()
export class Achat {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column()
  date: Date;

  @ManyToOne(() => Produit, (Produit) => Produit.reference, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "reference" })
  reference: Produit;

  @Column()
  total: number;

  @ManyToOne(() => Client, (Client) => Client.id, {
    onDelete: "SET NULL",
    onUpdate: "CASCADE",
  })
  @JoinColumn({ name: "id_client" })
  client: Client;

  @Column({ type: "tinyint" })
  typeAchat: number;

  @Column()
  nombre: number;

  @Column()
  quantite: number;
}
