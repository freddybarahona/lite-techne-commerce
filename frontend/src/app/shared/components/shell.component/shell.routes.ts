import { Routes } from "@angular/router";
import { AboutUsComponent } from "../about.us.component/about.us.component";
import { ContactComponent } from "../contact.component/contact.component";
import { HomeComponent } from "../home.component/home.component";
import { roleGuard } from "../../../core/guards/role.guard";
import { authGuard } from "../../../core/guards/auth.guard";


export default [
  {path: 'about', component: AboutUsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'home', component: HomeComponent},
  {
    path: 'group-products',
    loadChildren: () => import('../group.products/group.customer.routes')
  },
  {
    path: 'product',
    loadChildren: () => import('../specific.product/specific.product.routes')
  },
  {
    path: 'seller',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['SELLER'] },
    loadChildren: () => import('../../../features/seller/seller.routes')
  },
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
  }
] as Routes