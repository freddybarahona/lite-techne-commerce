import { Router } from "express"

const routes = Router()

routes.post("", async(req, res)=>{
  const rsp= await createInventorycontroller

})



export default routes


bg-amber-400

type Bacgrounds = "amber" | "green"

type Values = "100" | "200" | "300"

type Property = "bg" | "text" | "border" | "box-shadow"

type Mixing = `${Property}-${Bacgrounds}-${Values}`

const value: Mixing = ""