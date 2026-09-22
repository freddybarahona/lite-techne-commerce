import { Routes } from "@angular/router";
import { ProductStockComponent } from "./pages/product.stock.component/product.stock.component";
import { CartComponent } from "../../shared/components/cart.component/cart.component";

export default [
  {
    path: '',
    component: ProductStockComponent
  },
  {
    path: 'cart',
    component: CartComponent
  }
] as Routes