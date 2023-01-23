import { Service } from "typedi";
import { DeleteResult } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";
import { ProduitNomTypeProduit } from "../../Donnees/DataTransfertObject/ProduitNomTypeProduit";
import { ProduitReference } from "../../Donnees/DataTransfertObject/ProduitReference";
import { ProduitReferenceNom } from "../../Donnees/DataTransfertObject/ProduitReferenceNom";
import { ProduitTypeProduit } from "../../Donnees/DataTransfertObject/ProduitTypeProduit";
import { Produit } from "../../Donnees/DomainObject/Produit";
import { ProduitRepository } from "../../Repository/ProduitRepository";

export interface ProduitSMAci {
  add(produit: Produit): Promise<Produit>;
  liste(): Promise<Produit[]>;
  deleteProduit(reference: string): Promise<DeleteResult>;
  getItem(reference: string): Promise<Produit>;
  getReference(): Promise<ProduitReferenceNom[]>;
  getNameByReference(reference: string): Promise<ProduitNomTypeProduit>;
  getTypeProduit(reference: string): Promise<ProduitTypeProduit>;
  getUniqueReference(): Promise<ProduitReference[]>;
}

@Service()
export class ProduitSMImpl implements ProduitSMAci {
  @InjectRepository()
  produitRepository: ProduitRepository;

  add(produit: Produit): Promise<Produit> {
    return this.produitRepository.add(produit);
  }

  liste(): Promise<Produit[]> {
    return this.produitRepository.liste();
  }

  deleteProduit(reference: string): Promise<DeleteResult> {
    return this.produitRepository.deleteProduit(reference);
  }
  getItem(reference: string): Promise<Produit> {
    return this.produitRepository.getItem(reference);
  }
  getReference(): Promise<ProduitReferenceNom[]> {
    return this.produitRepository.getReference();
  }
  getNameByReference(reference: string): Promise<ProduitNomTypeProduit> {
    return this.produitRepository.getNameByReference(reference);
  }
  getTypeProduit(reference: string): Promise<ProduitTypeProduit> {
    return this.produitRepository.getTypeProduit(reference);
  }
  getUniqueReference(): Promise<ProduitReference[]> {
    return this.produitRepository.getUniqueReference();
  }
}
