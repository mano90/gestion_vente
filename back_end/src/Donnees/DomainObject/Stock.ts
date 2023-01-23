import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Produit } from "./Produit";

@Entity()
export class Stock {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Produit, (Produit) => Produit.reference, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "reference" })
  reference: Produit;

  @Column()
  quantite: number;

  @Column({ nullable: true, type: "date" })
  datePeremption?: string;

  @Column({ type: "date" })
  dateEntree: string;

  @Column()
  reste: number;

  @Column({ default: false })
  deleted: boolean;
}
