import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  get(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.baseUrl}/products`);
  }

  getById(id: string): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${environment.baseUrl}/products/${id}`);
  }

  create(product: Product): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/products/`, product);
  }

  update(product: Product): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/products/${product.id}`, product);
  }

  delete(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/products/${id}`);
  }

}
