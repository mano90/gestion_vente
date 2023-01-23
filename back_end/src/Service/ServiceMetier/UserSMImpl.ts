import { User } from "../../Donnees/DomainObject/User";
import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import { UserRepository } from "../../Repository/UserRepository";

export interface UserSMAci {
  login(user: User);
  insertDefaultData(user: User): Promise<User>;
  // saveOrUpdateUser(user: User);
}

@Service()
export class UserSMImpl implements UserSMAci {
  @InjectRepository()
  userRepository: UserRepository;

  login(user: User) {
    return this.userRepository.login(user);
  }

  insertDefaultData(): Promise<User> {
    let user1 = new User();
    user1.identifiant = "Administrateur";
    user1.password = "631d77916f5ec6676d695e79f94abef3";
    user1.role = 1;
    let user2 = new User();
    user2.identifiant = "Gestionnaire";
    user2.password = "b8fc349a388701c2cd9c77c75dc3d939";
    user2.role = 0;
    this.userRepository.insertDefaultData(user1);
    return this.userRepository.insertDefaultData(user2);
  }

  // saveOrUpdateUser(user: User) {
  //   return this.userRepository.saveOrUpdateUser(user);
  // }

  // getUserById(identifiant: string) {
  //   return this.userRepository.getUserById(identifiant);
  // }
}
