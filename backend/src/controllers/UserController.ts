import { Request, Response } from "express";
import { IUserRepository } from "../repository/UserRepository";
import { StatusCodes } from "http-status-codes";
import {UniqueConstraintError} from "sequelize";

export class UserController {

    constructor(private readonly userRepository: IUserRepository){}

    async createUser(req:Request,res:Response){
        try{
            const userBody: any = req.body;

        if(!userBody){
            res.status(StatusCodes.BAD_REQUEST).json({message: "campos obrigatórios faltando"})
            return;
        }

        const user = await this.userRepository.createUser(userBody);
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

    async updateUser(req:Request,res:Response){
        try{
            const userBody = req.body;

        if(!userBody?.id){
            res.status(StatusCodes.BAD_REQUEST).json({message: "id não encontrado"})
            return;
        }

        const user = await this.userRepository.updateUser(userBody);
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

    
}