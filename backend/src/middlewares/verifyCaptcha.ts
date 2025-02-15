import axios from "axios";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const verifyCaptcha = async (req:Request, res:Response,next:NextFunction) => {
    const captcha = req.body.captcha;

    if(!captcha){
        res.status(StatusCodes.BAD_REQUEST).json({message: "por favor, complete o CAPTCHA"+captcha})
        return;
    }

    const secretKeyCaptcha = process.env.CAPTCHA_SECRET_KEY;

    try{
        const response = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret${secretKeyCaptcha}&response=${captcha}`
        );

        if(response.data.success){
            next();
        }
        else{
            res.status(StatusCodes.BAD_REQUEST).json({message: "erro ao validar o captcha"});
            return;
        }

    }catch(error){
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({message:"erro interno do servidor"});
        return;
    }
}