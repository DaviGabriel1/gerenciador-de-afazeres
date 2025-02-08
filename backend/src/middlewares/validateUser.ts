import {Request,Response,NextFunction} from "express";
import {z} from "zod";
import { customErrorMap } from "../services/translationZod";
import { StatusCodes } from "http-status-codes";

const today = new Date();
today.setHours(0, 0, 0, 0);

z.setErrorMap(customErrorMap);

const fileSchema = z.object({
    id:z.number().optional(),
    name: z.string().min(1),
    email: z.string().email(),
    password: z.string()
        .min(8, "A senha deve ter pelo menos 8 caracteres")
        .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
        .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
        .regex(/[0-9]/, "A senha deve conter pelo menos um número")
        .regex(/[\W_]/, "A senha deve conter pelo menos um caractere especial (!@#$%^&* etc.)"),
    remember_token: z.string().min(5),
    email_verified_at: z.string(),
    phone: z.string().min(11),
    avatar: z.string(),
    level: z.enum(["user","admin"],{
        message: "nivel inválido"
    })
})

export const validateUser = (req:Request,res:Response,next:NextFunction) => {
    const validateFields = fileSchema.safeParse(req.body);

    if(!validateFields.success){
        res.status(StatusCodes.BAD_REQUEST).json(validateFields.error.format());
        return;
    }

    req.body = validateFields.data;
    next();
}