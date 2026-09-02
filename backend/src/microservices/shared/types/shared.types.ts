import {NextFunction, Request, Response} from "express"

export type HandlerParams = (req: Request, res: Response) => Promise<void>

/* en proceso todavia no lo entiendo del todo */