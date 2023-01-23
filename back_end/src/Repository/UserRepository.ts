import { User } from "../Donnees/DomainObject/User";
import { Service } from "typedi";
import { EntityRepository, Repository } from "typeorm";

export interface UserRepositoryAci {
  // saveOrUpdateUser(user: User);
  login(user: User);
  insertDefaultData(user: User): Promise<User>
}

@Service()
@EntityRepository(User)
export class UserRepository
  extends Repository<User>
  implements UserRepositoryAci
{
  // saveOrUpdateUser(user: User) {
  //   return this.save(user);
  // }

  // getUserById(identifiant: string) {
  //   return this.findOne({ identifiant });
  // }

  login(user: User) {
    return this.createQueryBuilder("user")
      .select(["user.identifiant", "user.role"])
      .where("user.identifiant =:identifiant and user.password =:password", {
        identifiant: user.identifiant,
        password: user.password,
      })
      .getOne();
  }

  insertDefaultData(user: User): Promise<User>{
    return this.save(user);
  }
}
