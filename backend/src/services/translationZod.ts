import { ZodErrorMap } from "zod";

export const customErrorMap: ZodErrorMap = (issue) => {
    switch (issue.code) {
        case "invalid_type":
            return { message: `Esperado ${issue.expected}, mas recebeu ${issue.received}` };
        case "too_small":
            return { message: `O valor deve ser maior ou igual a ${issue.minimum}` };
        case "too_big":
            return { message: `O valor deve ser menor ou igual a ${issue.maximum}` };
        case "invalid_string":
            if (issue.validation === "email") {
                return { message: `Formato de e-mail inválido` };
            }
            return { message: `String inválida` };
        default:
            return { message: `Erro desconhecido` };
    }
};