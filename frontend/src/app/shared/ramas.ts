import { environment } from "../../environments/environment"

const url= environment.back_url

type ramas= "auth" | "categories" | "products" | "inventory" | "report" | "cart"

type sub_ramas= "inventory-history" | ""

type rama_completa= `/${ramas}/${sub_ramas}`

export type ramas_disp= Exclude<
  rama_completa, 
  "/products/inventory-history" | 
  "/auth/inventory-history" | 
  "/categories/inventory-history" | 
  "/inventory/inventory-history" | 
  "/cart/inventory-history"
>
