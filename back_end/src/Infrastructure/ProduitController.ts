import { Container } from "typedi";
import { Request, Response } from "express";
import {
  ErrorResponseDto,
  SuccessResponseDto,
} from "../Donnees/DataTransfertObject/ResponseDto";
import { UserValidator } from "../Contrainte/Validator/UserValidator";
import { ProduitSAImpl } from "../Service/ServiceApplicatif/ProduitSAImpl";
import { Produit } from "../Donnees/DomainObject/Produit";
import { DeleteResult } from "typeorm";
import { JwtUtility } from "../Commun/Token/JwtUtility";
import { ProduitReferenceNom } from "../Donnees/DataTransfertObject/ProduitReferenceNom";
import { ProduitNomTypeProduit } from "../Donnees/DataTransfertObject/ProduitNomTypeProduit";
import { ProduitStock } from "../Donnees/DataTransfertObject/ProduitStock";
import { unlink } from "fs";
const fs1 = require("fs");
const process = require("process");
const multer = require("multer");
// import * as multer from "multer";
const fileExtension = require("file-extension");
const storage = multer.diskStorage({
  // Setting directory on disk to save uploaded files
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },

  // Setting name of file saved
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + "." + fileExtension(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
  limits: {
    // Setting Image Size Limit to 2MBs
    fileSize: 2000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      //Error
      cb(new Error("Please upload JPG and PNG images only!"));
    }
    //Success
    cb(undefined, true);
  },
}).single("uploadedImage");

export class ProduitController {
  produitSA: ProduitSAImpl = Container.get(ProduitSAImpl);
  userValidator: UserValidator = Container.get(UserValidator);
  jwtUtility: JwtUtility = Container.get(JwtUtility);

  async add(req: Request, resp: Response) {
    try {
      const produitSaved = await this.produitSA.add(req.body);
      if (produitSaved == null) {
        resp.status(500).send(new ErrorResponseDto("error".toString(), true));
      } else {
        resp.status(200).send(produitSaved);
      }
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async update(req: Request, resp: Response) {
    try {
      const produitSaved = await this.produitSA.update(req.body);
      resp.status(200).send(produitSaved);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async liste(req: Request, resp: Response) {
    try {
      const listeProduits: ProduitStock[] = await this.produitSA.liste();
      resp.status(200).send(listeProduits);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async deleteProduit(req: Request, resp: Response) {
    try {
      const resultat: DeleteResult = await this.produitSA.deleteProduit(
        req.params.reference
      );
      resp.status(200).send(resultat);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async getReference(req: Request, resp: Response) {
    try {
      const listeReferences: ProduitReferenceNom[] =
        await this.produitSA.getReference();
      resp.status(200).send(listeReferences);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async getNameByReference(req: Request, resp: Response) {
    try {
      const liste: ProduitNomTypeProduit =
        await this.produitSA.getNameByReference(req.params.reference);
      resp.status(200).send(liste);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }

  async uploadFile(req: any, resp: Response) {
    let fileName: string = "";
    await upload(req, resp, function (err) {
      if (err instanceof multer.MulterError) {
        fileName = "";
        resp.status(500).send(new ErrorResponseDto(err.toString(), true));
      } else if (err) {
        fileName = "";
        resp.status(500).send(new ErrorResponseDto(err.toString(), true));
      }
      // fileName = req.file.filename;
      // fileName = req.body.file.filename;
      // console.log(req.file);
      resp.status(200).send({ message: req.file.filename });
      // resp.status(200).send({ message: "req.body.file.filename" });
    });
  }

  async deleteFile(req: Request, resp: Response) {
    const fileName: string = req.params.path;
    const cwd: string = process.cwd() + "/uploads/" + fileName;
    unlink(cwd, (err) => {
      if (err) {
        console.log("error");
      }
      // console.log("successfully deleted /tmp/hello");
    });
  }

  async readFile(req: Request, resp: Response) {
    fs1.readFile("./uploads/" + req.params.image, function (err, data) {
      if (err) {
        console.log(err);
      } // Fail if the file can't be read.
      resp.writeHead(200, { "Content-Type": "image/jpeg" });
      resp.end(data); // Send the file data to the browser.
    });
  }

  async getItem(req: Request, resp: Response) {
    try {
      const produit: ProduitStock = await this.produitSA.getItem(req.params.id);
      resp.status(200).send(produit);
    } catch (e) {
      resp.status(500).send(new ErrorResponseDto(e.toString(), true));
    }
  }
}
