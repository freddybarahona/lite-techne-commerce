import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ramas_disp } from '../../ramas';
import { GenericResponse } from '../../core/interfaces/generic.response';
import { ProductDTO } from '../interfaces/product.dto.interface';
import { Observable } from 'rxjs';
import { CreateProductRequest } from '../interfaces/create.product.request.interface';

@Service()
export class ProductsService {
  private http= inject(HttpClient)
  private url= `${environment.back_url}`
  private rama: ramas_disp= '/products/'

  createProduct(request: CreateProductRequest): Observable<GenericResponse<ProductDTO>>{
    return this.http.post<GenericResponse<ProductDTO>>(`${this.url}${this.rama}`, request)
  }

  getProducts(): Observable<GenericResponse<ProductDTO[]>>{
    return this.http.get<GenericResponse<ProductDTO[]>>(`${this.url}${this.rama}`)
  }

  getProductById(id: number): Observable<GenericResponse<ProductDTO[]>>{
    return this.http.get<GenericResponse<ProductDTO[]>>(`${this.url}${this.rama}${id}`)
  }

  UpdateProduct(id: number, request: number): Observable<GenericResponse<ProductDTO>>{
    return this.http.put<GenericResponse<ProductDTO>>(`${this.url}${this.rama}${id}`, request)
  }
}
