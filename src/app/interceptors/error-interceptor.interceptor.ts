import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private snackBar: MatSnackBar) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMsg = 'Ocurrió un error inesperado';
        if (error.status === 404) {
          errorMsg = 'Recurso no encontrado';
        } else if (error.status === 500) {
          errorMsg = 'Error en el servidor, por favor intente más tarde';
        }
        this.snackBar.open(errorMsg, 'Cerrar', { duration: 3000 });
        return throwError(error);
      })
    );
  }
}
