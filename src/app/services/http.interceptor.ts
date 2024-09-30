import { Injectable } from '@angular/core';
import {HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHandlerFn} from '@angular/common/http';
import { Observable } from 'rxjs';
import {UsuarioSesion} from "../entities/login";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor() {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const jwt = localStorage.getItem('jwt');
        //console.log("Interceptor, usuario: " + jwt);
        if (jwt) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', `Bearer ${jwt}`)
            });
            // Envia la solicitud clonada con el encabezado JWT
            return next.handle(cloned);
        }
        return next.handle(req);
    }

}