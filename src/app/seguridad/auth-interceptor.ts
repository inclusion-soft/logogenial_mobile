import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { environment } from 'src/environments/environment';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private urlApp: string;

    constructor(private usuarioService: UsuarioService) {
        this.urlApp = environment.url;
    }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        const token = this.usuarioService.getToken();
        if (token != null && req.url.indexOf('oauth/token') < 0) {
            if (req.url.indexOf(this.urlApp) > -1) {
                authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
            }
        }
        return next.handle(authReq);
    }
}
