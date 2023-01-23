const md5 = require("md5");
import { Service } from "typedi";
import { SuccessResponseDto } from "../../Donnees/DataTransfertObject/ResponseDto";
import { User } from "../../Donnees/DomainObject/User";

export interface UserFactoryAci {
  saveOrUpdateUserDo(userDto: any);
}

@Service()
export class UserFactory implements UserFactoryAci {
  saveOrUpdateUserDo(userDto: any) {
    let user = new User();
    user.identifiant = userDto.identifiant;
    user.password = md5(userDto.password);
    return user;
  }

  createLoginDto(token: string) {
    return new SuccessResponseDto({ token });
  }
}
