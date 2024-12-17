import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private baseUrl = environment.urlServidor
  private http=inject(HttpClient)

  funListar2(){
    return this.http.get(`${this.baseUrl}/producto/back`,{headers:{'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6I…Dg0fQ.CRUBJ_tMKDa7cKs61BzhB-vlOWjfzsug5hexk0KM2NE'}})
  }

}
