import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from "typeorm";
import { Achat } from "./Achat";

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  prenoms: string;

  @Column({ nullable: true })
  adresse: string;

  @OneToMany(() => Achat, (Achat) => Achat.client, { cascade: true })
  achat?: Achat;
}
