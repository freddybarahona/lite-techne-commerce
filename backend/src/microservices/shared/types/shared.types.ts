import {NextFunction, Request, Response} from "express"

export type HandlerParams = (req: Request, res: Response) => Promise<void>

/* en proceso todavia no lo entiendo del todo */

export type MovementType = "IN" | "OUT"

type publishers = "inventory" | "catalog.product"

type actions = "created" | "updated" | "deleted"

export type publishType = `${publishers}.${actions}` 