import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { environment } from 'src/environments/environment'
import { Router } from '@angular/router'

@Injectable()
export class CorsInterceptor implements HttpInterceptor {
  constructor(private router: Router) { }
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token')
    const adminToken = localStorage.getItem('admintoken')

    if (adminToken && this.router.url.slice(0,6) == '/admin') {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
          Authorization: `Bearer ${adminToken}`,
        },
      })
    }
    else if (token) {
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
          Authorization: `Bearer ${token}`,
        },
      })
    }
    else{
      request = request.clone({
        setHeaders: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      })

    }

    return next.handle(request).pipe(
      catchError((error: any) => {
        if (this.router.url.slice(0,6) == '/admin') {
          if (error instanceof HttpErrorResponse) {
            console.log(error)
            if (error.status === 401) {
              localStorage.removeItem('admintoken')
              this.router.navigate(['/adminlogin'])
              return throwError(error)
            } else {
              this.router.navigate(['/error'],{state:{errorMsg:error.message}})
              return throwError(error)
            }
          } else {
            this.router.navigate(['/error'],{state:{errorMsg:error.message}})
            return throwError(error)
          }
        } else {
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) {
              localStorage.removeItem('token')
              window.location.href = environment.trinityApiUrl + '/login'
              return new Observable<HttpEvent<any>>()
            } else {
              this.router.navigate(['/error'],{state:{errorMsg:error.message}})
              return throwError(error)
            }
          } else {
            this.router.navigate(['/error'],{state:{errorMsg:error.message}})
            return throwError(error)
          }
        }
      })
    )
  }
}
