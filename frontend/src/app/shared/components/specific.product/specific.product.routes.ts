import { Routes } from "@angular/router";
import { SpecificProductComponent } from "./specific.product.component/specific.product.component";


export default [
  {
    path: ':id',
    component: SpecificProductComponent
  }
] as Routes