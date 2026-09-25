import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ramas_disp } from '../ramas';
import { GenericResponse } from '../../core/interfaces/generic.response';
import { CartDTO } from '../interfaces/cart/cart.dto';
import { Observable } from 'rxjs';
import { CreateCartItemRequest } from '../interfaces/cart/create.cart.item.request';
import { UpdateCartItemRequest } from '../interfaces/cart/update.cart.item.request';

@Service()
export class CartService {
  private http= inject(HttpClient)
  private url= environment.back_url
  private rama: ramas_disp='/cart/' 

  getCartItems(): Observable<GenericResponse<CartDTO[]>>{
    return this.http.get<GenericResponse<CartDTO[]>>(`${this.url}${this.rama}`)
  }

  createCartItem(request: CreateCartItemRequest): Observable<GenericResponse<CartDTO>>{
    return this.http.post<GenericResponse<CartDTO>>(`${this.url}${this.rama}`, request)
  }

  deleteCartItem(id: number): Observable<GenericResponse<CartDTO>>{
    return this.http.delete<GenericResponse<CartDTO>>(`${this.url}${this.rama}${id}`)
  }

  updateCartItem(id: number, request: UpdateCartItemRequest): Observable<GenericResponse<CartDTO>>{
    return this.http.put<GenericResponse<CartDTO>>(`${this.url}${this.rama}${id}`, request)
  }
}
