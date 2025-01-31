import {Router, Request, Response} from "express";

const router = Router();

router.get("/teste",(req:Request,res:Response) => {
    res.send({message: "teste"});
})

export default router;