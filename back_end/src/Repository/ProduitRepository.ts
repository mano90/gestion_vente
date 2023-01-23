import { Service } from "typedi";
import { DeleteResult, EntityRepository, Repository } from "typeorm";
import { ProduitNomTypeProduit } from "../Donnees/DataTransfertObject/ProduitNomTypeProduit";
import { ProduitReference } from "../Donnees/DataTransfertObject/ProduitReference";
import { ProduitReferenceNom } from "../Donnees/DataTransfertObject/ProduitReferenceNom";
import { ProduitTypeProduit } from "../Donnees/DataTransfertObject/ProduitTypeProduit";
import { Produit } from "../Donnees/DomainObject/Produit";

export interface ProduitRepositoryAci {
  liste(): Promise<Produit[]>;
  getReference(): Promise<ProduitReferenceNom[]>;
  getNameByReference(reference: string): Promise<ProduitNomTypeProduit>;
  add(produit: Produit): Promise<Produit>;
  deleteProduit(reference: string): Promise<DeleteResult>;
  getItem(reference: string): Promise<Produit>;
  getTypeProduit(reference: string): Promise<ProduitTypeProduit>;
  getUniqueReference(): Promise<ProduitReference[]>;
}

@Service()
@EntityRepository(Produit)
export class ProduitRepository
  extends Repository<Produit>
  implements ProduitRepositoryAci
{
  add(produit: Produit): Promise<Produit> {
    return this.save(produit);
  }

  liste(): Promise<Produit[]> {
    return this.createQueryBuilder("produit").getMany();
  }

  deleteProduit(reference: string): Promise<DeleteResult> {
    return this.createQueryBuilder()
      .delete()
      .from("produit")
      .where("reference =:reference", { reference: reference })
      .execute();
  }

  getItem(reference: string): Promise<Produit> {
    return this.createQueryBuilder("produit")
      .where("produit.reference= :reference", { reference: reference })
      .getOne();
  }

  getReference(): Promise<ProduitReferenceNom[]> {
    return this.createQueryBuilder("produit")
      .select(["produit.reference", "produit.nom"])
      .getMany();
  }

  getNameByReference(reference: string): Promise<ProduitNomTypeProduit> {
    return this.createQueryBuilder("produit")
      .where("produit.reference= :reference", { reference: reference })
      .select(["produit.typeProduit", "produit.nom"])
      .getOne();
  }
  getTypeProduit(reference: string): Promise<ProduitTypeProduit> {
    return this.createQueryBuilder("produit")
      .where("produit.reference= :reference", { reference: reference })
      .select(["produit.typeProduit"])
      .getOne();
  }

  getUniqueReference(): Promise<ProduitReference[]> {
    return this.createQueryBuilder("produit")
      .select(["produit.reference"])
      .getMany();
  }
}
