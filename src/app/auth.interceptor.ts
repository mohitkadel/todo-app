import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map, catchError } from 'rxjs/operators';
import { environment } from './../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor() {}

    intercept(request: HttpRequest < any > , next: HttpHandler): Observable < HttpEvent < any >> {
        
        request = request.clone({ url: environment.APIURL + request.url });

        return next.handle(request)
    }
}
