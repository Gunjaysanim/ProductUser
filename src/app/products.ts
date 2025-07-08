import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './Model/Product';
import { configurl }  from '../../src/app/assets/config';
//import { configurl } from './assets/config.ts'; // adjust path as needed

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  url = '/gateway/product'; // ✅ This works with proxy
//url = configurl.apiServer.url + '/product';
  constructor(private http: HttpClient) { }
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
  postProductData(productData: Product): Observable<Product> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Product>(this.url, productData, httpHeaders);
  }
  updateProduct(product: Product): Observable<Product> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.put<Product>(this.url, product, httpHeaders);
  }
  deleteProductById(id: number): Observable<number> {
    return this.http.delete<number>(this.url + '/' + id);
  }
  getProductDetailsById(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + id);
  }
}
