import { Request,Response } from "express";
import { StatusCodes } from "http-status-codes";
import bcrypt from "bcrypt";

import { IAuthRepository } from "../repository/AuthRepository";
import { IUser } from "../interfaces/IUser";
import { ILoginParams } from "../interfaces/ILoginParams";
import { UniqueConstraintError } from "sequelize";

export class AuthController{
    constructor(private readonly authRepository:IAuthRepository){}

    async register(req:Request,res:Response){
        try{
            const userBody: IUser = req.body;

        if(!userBody){
            res.status(StatusCodes.BAD_REQUEST).json({message: "campos obrigatórios faltando"})
            return;
        }

        const password = userBody.password;
        const saltRounds = 10;

        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password,salt);

        userBody.password = hash;

        const user = await this.authRepository.createUser(userBody);
        res.status(StatusCodes.OK).json(user);
        }
        catch(error){
            if(error instanceof UniqueConstraintError){
            res.status(StatusCodes.BAD_REQUEST).json({message: "esse email já está sendo utilizado em outra conta"});
            }
            else{
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "erro interno do servidor"});
            }
        }
    }

    async login(req:Request,res:Response){
        try{
            const login:ILoginParams = req.body;

            const hash: string = await this.authRepository.findHash(login.email);

            if(!hash){
                res.status(StatusCodes.BAD_REQUEST).json({message: "E-mail não cadastrado"});
                return;
            }

            const validPassword = await bcrypt.compare(login.password,hash);

            if(!validPassword){
                res.status(StatusCodes.UNAUTHORIZED).json({message: "senha inválida"});
                return;
            }

            res.status(StatusCodes.OK).json({message: "autenticado com sucesso"});
            return;
        }catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "erro interno do servidor"});
        }
    }
     
}