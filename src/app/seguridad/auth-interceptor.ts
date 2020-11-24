import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { environment } from 'src/environments/environment';
import {  from } from 'rxjs';
import { of } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';


const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    private urlApp: string;
    constructor(private usuarioService: UsuarioService) {
        this.urlApp = environment.url;
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return Observable.fromPromise(this.handleAccess(request, next));
      }

    private async handleAccess(request: HttpRequest<any>, next: HttpHandler):
        Promise<HttpEvent<any>> {
        const token = await this.usuarioService.getTokenAsync();
        let changedRequest = request;
        const headerSettings: {[name: string]: string | string[]; } = {};
        for (const key of request.headers.keys()) {
            headerSettings[key] = request.headers.getAll(key);
        }
        if (token) {
            headerSettings['Authorization'] = 'Bearer ' + token;
        }
        headerSettings['Content-Type'] = 'application/json';
        const newHeader = new HttpHeaders(headerSettings);

        changedRequest = request.clone({ headers: newHeader});
        return next.handle(changedRequest).toPromise();
  }
}
