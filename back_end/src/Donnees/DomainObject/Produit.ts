import { Entity, Column, PrimaryColumn, ManyToOne, OneToMany } from "typeorm";
import { Achat } from "./Achat";
import { Stock } from "./Stock";

@Entity()
export class Produit {
  @PrimaryColumn()
  reference: string;

  @Column()
  nom: string;

  @Column()
  prix: number;

  @Column()
  typeProduit: boolean;

  @Column()
  nombrePacket: number;

  @Column()
  carton: number;

  @Column()
  path: string;

  @OneToMany(() => Stock, (Stock) => Stock.reference, {
    cascade: true,
    nullable: true,
  })
  stock?: Stock;

  @OneToMany(() => Achat, (Achat) => Achat.reference, {
    cascade: true,
    nullable: true,
  })
  achat?: Achat;
}
