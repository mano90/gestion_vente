import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryColumn()
  identifiant: string;

  @Column({
    default: "0d25325870e437c102db682a84594aa8",
  })
  password: string;

  @Column()
  role: number;
}
