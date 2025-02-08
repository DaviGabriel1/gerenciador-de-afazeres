import User, { UserAttributes } from "../models/User"

type UserCreationAttributes = Omit<UserAttributes, "id" | "createdAt" | "updatedAt">;
type UserUpdateAttributes = Omit<UserAttributes, "createdAt" | "updatedAt">;

export interface IUserRepository {
  createUser(user: UserCreationAttributes): Promise<User>;
  updateUser(user: UserUpdateAttributes): Promise<User>;
}

export class UserRepository implements IUserRepository {
  public async createUser(user: UserCreationAttributes): Promise<User> {
    console.log(user);
    
    const newUser = await User.create(user);
    
    return newUser;
  }

  public async updateUser(user: UserUpdateAttributes): Promise<User>{
    const updatedUser = await User.findByPk(user.id);
    if(!updatedUser){
        throw new Error("Usuário inválido");
    }
    updatedUser.name = user.name ? user.name : updatedUser.name;
    updatedUser.email = user.email ? user.email : updatedUser.email;
    updatedUser.password = user.password ? user.password : updatedUser.password;
    updatedUser.email_verified_at = user.email_verified_at ? user.email_verified_at : updatedUser.email_verified_at;
    updatedUser.phone = user.phone ? user.phone : updatedUser.phone;
    updatedUser.avatar = user.avatar ? user.avatar : updatedUser.avatar;
    updatedUser.level = user.level ? user.level : updatedUser.level;
    await updatedUser.save();
    return updatedUser;
  }
}
