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
    path: 'customer',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['CUSTOMER'] },
    loadChildren: () => import('../../../features/customer/customer.routes')
  },
  {
    path: 'administrator',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ADMINISTRATOR'] },
    loadChildren: () => import('../../../features/administrator/administrator.routes')
  },
  {
    path: '', 
    redirectTo: 'home', 
    pathMatch: 'full'
  }
] as Routes

/* 
data es un contenedor genérico de Angular para pasar metadatos a la ruta (los lee el guard, no los usa el router).
Debe ser un array (['CUSTOMER']) porque el guard hace allowedRoles?.includes(role) — includes() espera un array y así soportas "uno o más roles".
Los valores del array deben coincidir con UserRole (auth-session.service.ts:6): 'ADMINISTRATOR' | 'SELLER' | 'CUSTOMER'. La clave es la propiedad plural roles, no role.
*/