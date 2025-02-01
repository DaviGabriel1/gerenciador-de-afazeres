import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const validateToken = (req:Request,res:Response,next:NextFunction):void => {
    const TOKEN_KEY = process.env.TOKEN_KEY;

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token não fornecido" });
        return;
      }
    if(token !== TOKEN_KEY){
        res.status(StatusCodes.FORBIDDEN).json({ message: "Token inválido ou expirado" });
        return;
    }
    next(); 
}