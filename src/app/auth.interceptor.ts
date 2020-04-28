import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';

import { environment } from './../environments/environment';

import { throwError, Observable } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';

import { AuthService } from './auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
        // add authorization header with basic auth credentials if available
        
        const user = this.authService.user;
        const token = this.authService.token;
        if (user && this.authService.token) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': `${token}`
                }
            });
        }

        request = request.clone({ url: environment.APIURL + request.url });

        return next.handle(request)
        .pipe(
            catchError((error: any) => {
                // Logout if recieve un authorize error
                if(error.status === 403) {
                    this.authService.logout();
                }
                return throwError(error);
            })
        );
    }
}
