import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ramas_disp } from '../../ramas';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../core/interfaces/generic.response';
import { InventoryDTO } from '../interfaces/inventories/inventory.dto';
import { CreateInventoryRequest } from '../interfaces/inventories/create.inventory.request';
import { UpdateInventoryRequest } from '../interfaces/inventories/update.inventory.request';

@Service()
export class InventoryService {
  private http= inject(HttpClient)
  private url= `${environment.back_url}`
  private rama: ramas_disp= '/products/'

  createInventory(request: CreateInventoryRequest): Observable<GenericResponse<InventoryDTO>>{
    return this.http.post<GenericResponse<InventoryDTO>>(`${this.url}${this.rama}`, request)
  }

  getInventories(): Observable<GenericResponse<InventoryDTO[]>>{
    return this.http.get<GenericResponse<InventoryDTO[]>>(`${this.url}${this.rama}`)
  }

  getInventoryById(id: number): Observable<GenericResponse<InventoryDTO[]>>{
    return this.http.get<GenericResponse<InventoryDTO[]>>(`${this.url}${this.rama}${id}`)
  }

  UpdateInventory(id: number, request: UpdateInventoryRequest): Observable<GenericResponse<InventoryDTO>>{
    return this.http.put<GenericResponse<InventoryDTO>>(`${this.url}${this.rama}${id}`, request)
  }

  softDeleteInventory(id: number): Observable<GenericResponse<null>>{
    return this.http.delete<GenericResponse<null>>(`${this.url}${this.rama}${id}`)
  }

}
