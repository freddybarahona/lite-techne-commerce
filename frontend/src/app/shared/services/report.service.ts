import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ramas_disp } from '../../ramas';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../core/interfaces/generic.response';
import { InventoryHistoryDTO } from '../interfaces/report/inventory.histories/inventory.history.dto';
import { CreateInventoryHistoryRequest } from '../interfaces/report/inventory.histories/create.inventory.history.request';

@Service()
export class ReportService {
  private http= inject(HttpClient)
  private url= `${environment.back_url}`
  private rama: ramas_disp= '/report/inventory-history'

  createInventoryHistory(request: CreateInventoryHistoryRequest): Observable<GenericResponse<InventoryHistoryDTO>>{
    return this.http.post<GenericResponse<InventoryHistoryDTO>>(`${this.url}${this.rama}`, request)
  }

  getAllInventoryHistories(): Observable<GenericResponse<InventoryHistoryDTO[]>>{
    return this.http.get<GenericResponse<InventoryHistoryDTO[]>>(`${this.url}${this.rama}`)
  }

  getInventoryHistoryById(): Observable<GenericResponse<InventoryHistoryDTO>>{
    return this.http.get<GenericResponse<InventoryHistoryDTO>>(`${this.url}${this.rama}`)
  }
}
