import { Request, Response } from "express";
import { IUserRepository } from "../repository/UserRepository";
import { StatusCodes } from "http-status-codes";
import {UniqueConstraintError} from "sequelize";

export class UserController {

    constructor(private readonly userRepository: IUserRepository){}

    async findAllUsers(req:Request,res:Response){
        try{
            const users = await this.userRepository.findAll();
            res.status(StatusCodes.OK).json(users);
        }
        catch(error){
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "erro interno do servidor"+error});
        }
    }

    async updateUser(req:Request,res:Response){
        try{
            const userBody = req.body;

        if(!userBody?.id){
            res.status(StatusCodes.NOT_FOUND).json({message: "id não encontrado"})
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
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "erro interno do servidor: "+error});
            }
        }
    }

    async deleteUser(req:Request,res:Response){
        try{
            const id = req.params.id;

        if(!id){
            res.status(StatusCodes.NOT_FOUND).json({message: "id não encontrado"})
            return;
        }

        const flag = await this.userRepository.deleteUser(id);

        if(!flag){
            res.status(StatusCodes.NOT_FOUND).json({message: "usuário não encontrado"});
        }
        else{
            res.status(StatusCodes.NO_CONTENT).end();
        }
        }
        catch(error){
            if(error instanceof UniqueConstraintError){
            res.status(StatusCodes.BAD_REQUEST).json({message: "esse email já está sendo utilizado em outra conta"});
            }
            else{
                res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message: "erro interno do servidor: "+error});
            }
        }
    }

    
}