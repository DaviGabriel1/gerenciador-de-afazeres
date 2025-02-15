import User, { UserAttributes } from "../models/User";

type UserCreationAttributes = Omit<UserAttributes, "id" | "createdAt" | "updatedAt">;

export interface IAuthRepository{
    createUser(user: UserCreationAttributes): Promise<User>;
    findHash(email:string):Promise<string>;
}

export class AuthRepository implements IAuthRepository{
    public async findHash(email: string): Promise<string> {
        const hash = await User.findOne({where:{email}});
        return hash ? hash.password : "";
    }

    public async createUser(user: UserCreationAttributes): Promise<User> {
        console.log(user);
        
        const newUser = await User.create(user);
        
        return newUser;
      }
}