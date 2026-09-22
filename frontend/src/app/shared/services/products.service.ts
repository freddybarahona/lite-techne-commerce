import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ramas_disp } from '../ramas';
import { GenericResponse } from '../../core/interfaces/generic.response';
import { ProductDTO } from '../interfaces/products/product.dto.interface';
import { Observable } from 'rxjs';
import { CreateProductRequest } from '../interfaces/products/create.product.request.interface';
import { UpdateProductRequest } from '../interfaces/products/update.product.request';

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

  UpdateProduct(id: number, request: UpdateProductRequest): Observable<GenericResponse<ProductDTO>>{
    return this.http.put<GenericResponse<ProductDTO>>(`${this.url}${this.rama}${id}`, request)
  }

  softDeleteProduct(id: number): Observable<GenericResponse<null>>{
    return this.http.delete<GenericResponse<null>>(`${this.url}${this.rama}${id}`)
  }
}
