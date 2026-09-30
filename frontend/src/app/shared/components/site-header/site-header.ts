import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink, NavigationEnd } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { AuthSessionService } from '../../../core/auth/auth-session.service';
import { ModalComponent } from '../modal/modal.component/modal.component';
import { CartService } from '../../services/cart.service';
import { CartDTO } from '../../interfaces/cart/cart.dto';

@Component({
  selector: 'app-site-header',
  host: { class: 'sticky top-0 z-40 block'},
  imports: [RouterLink, ModalComponent],
  templateUrl: './site-header.html',
})
export class SiteHeader {
  private readonly router = inject(Router)
  private readonly session = inject(AuthSessionService)
  private readonly cart= inject(CartService)
  cartOpen: boolean= false
  cartSize:'sm'|'md'|'lg'= 'md'
  areElements=false
  cartItems= signal<CartDTO[]>([])
  currentUrl= signal(this.router.url)

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd), takeUntilDestroyed())
      .subscribe(() => this.currentUrl.set(this.router.url))
  }

  isActive = (path: string) => this.currentUrl() === path || (path === '/home' && this.currentUrl() === '/')
  
  getUserCart(){
      this.cart.getCartItems().subscribe({next: (response) =>{
        if(response.data.length > 0){
          this.areElements=true
        }
        console.log("obtuvimos bien la ruta")
      }, error: (err) =>{

      }
    })
  }


  openCart(){ this.cartOpen = true}
  
  isLogged = () => this.session.isAuthenticated()

  logout(){
    this.session.deleteToken()
    this.router.navigate(['/home'])
  }

  get role(){
    return this.session.getRole()
  }

  get dashboard(){ //getter con binding una forma mejor de obtener y crear propiedad
    return this.session.getDashboard()
  }

  /* get cart(){
    const subrute= this.dashboard + '/cart'
    return subrute
  } */

  get subrute(){
    switch(this.dashboard){
      case '/administrator':
        return this.dashboard + '/report-items'
      case '/seller':
        return this.dashboard + '/cart'
      default:
        return null
    }
  }
}
