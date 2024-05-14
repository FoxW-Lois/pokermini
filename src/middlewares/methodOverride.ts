import { Request, Response } from "express"

export const loadFromHiddenField  = (req : Request , res : Response ) : string => {
    if (req.body && typeof req.body === "object" && "_method" in req.body) {
        const method = req.body._method as string
        delete req.body._method
        return method
    }
    return req.method
}