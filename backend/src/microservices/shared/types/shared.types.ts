import {NextFunction, Request, Response} from "express"

export type HandlerParams = (req: Request, res: Response) => Promise<void>

/* en proceso todavia no lo entiendo del todo */

export type MovementType = "IN" | "OUT"

export type publishType = "inventory.created" | "inventory.updated" | "inventory.deleted"