import User, { UserAttributes } from "../models/User"

type UserUpdateAttributes = Omit<UserAttributes, "createdAt" | "updatedAt">;

export interface IUserRepository {
    findAll():Promise<User[]>;
    updateUser(user: UserUpdateAttributes): Promise<User>;
    deleteUser(id:string): Promise<boolean>;
}

export class UserRepository implements IUserRepository {
    public async findAll(): Promise<User[]>{
        const users = await User.findAll();
        return users;
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

  public async deleteUser(id:string): Promise<boolean>{
    const user = await User.findByPk(id);

    if(!user){
        return false;
    }
    await user.destroy();
    return true;
  }
}
