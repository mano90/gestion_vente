import { User } from "../../Donnees/DomainObject/User";
import { UserFactory } from "../../Contrainte/Factory/UserFactory";
import { Container, Service } from "typedi";
import { UserSMImpl } from "../ServiceMetier/UserSMImpl";
import { JwtUtility } from "../../Commun/Token/JwtUtility";
import { ErrorResponseDto } from "../../Donnees/DataTransfertObject/ResponseDto";

export interface UserSAAci {
  login(user: User);
  insertDefaultData(user: User): Promise<User>;
  // saveOrUpdateUser(user: User);
}

@Service()
export class UserSAImpl implements UserSAAci {
  userFactory: UserFactory = Container.get(UserFactory);
  userSM: UserSMImpl = Container.get(UserSMImpl);
  jwtUtility: JwtUtility = Container.get(JwtUtility);

  async login(userDto: any) {
    let user = await this.userSM.login(
      this.userFactory.saveOrUpdateUserDo(userDto)
    );
    if (user) {
      return {
        token: this.userFactory.createLoginDto(
          this.jwtUtility.createToken(user)
        ),
        identifiant: user.identifiant,
        role: user.role,
      };
    } else {
      throw new ErrorResponseDto("Non authorisé", true, 401);
    }
  }

  insertDefaultData(): Promise<User> {
    return this.userSM.insertDefaultData();
  }

  // saveOrUpdateUser(userDto: any) {
  //   let userDo: User = this.userFactory.saveOrUpdateUserDo(userDto);
  //   return this.userSM.saveOrUpdateUser(userDo);
  // }

  // async updateUser(user: User) {
  //   const userToUpdate: User = await this.userSM.getUserById(user.identifiant);
  //   userToUpdate.identifiant = user.identifiant;
  //   userToUpdate.password = user.password;
  //   const result = await this.userSM.saveOrUpdateUser(userToUpdate);
  //   return result;
  // }
}
