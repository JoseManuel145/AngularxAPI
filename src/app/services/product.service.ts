import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, Observable, throwError } from 'rxjs';
import { Product } from '../models/product';
import { catchError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiURL = 'https://fakestoreapi.com/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiURL);
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product | null>(`${this.apiURL}/${id}`).pipe(
      map((product) => {
        if (!product) {
          throw new HttpErrorResponse({
            status: 404,
            statusText: 'Producto no encontrado'
          });
        }
        return product;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new HttpErrorResponse({ status: 404, statusText: 'Producto no encontrado' }));
        }
        return throwError(() => error);
      })
    );
  }

  postProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.apiURL}`, product)
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.apiURL}/${product.id}`, product);
  }

  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${id}`);
  }
  private handleError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
