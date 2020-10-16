import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NavController } from '@ionic/angular';
import { UsuarioModel } from '../models/usuario-model';
import { Storage } from '@ionic/storage';
import { Observable } from 'rxjs';
const URL = environment.url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private token: string = null;
  informacion: string = null;
  urlService = 'v1/usuario-api';
  private usuario: UsuarioModel = new UsuarioModel();
 
   constructor( private http: HttpClient,
                private storage: Storage,
                private navCtrl: NavController ) { }
 
 
   login( email: string, password: string ) {
 
     const data = { email, password };
 
     return new Promise( resolve => {
 
       this.http.post(`${ URL }/user/login`, data )
         .subscribe( async resp => {
           console.log(resp);
 
           if ( resp['ok'] ) {
             await this.guardarToken( resp['token'] );
             resolve(true);
           } else {
             this.token = null;
             this.storage.clear();
             resolve(false);
           }
 
         });
 
     });

   }

   logout() {
     this.token   = null;
     this.usuario = null;
     this.storage.clear();
     this.navCtrl.navigateRoot('/login', { animated: true });
   }

   register(data: UsuarioModel): Observable<any> {
    const endPoint = URL + this.urlService + '/create';
    return this.http.post<any>(endPoint, data);
  }

  attemptAuth(credentials: any): Observable<any> {
    const endPoint = URL + 'api/auth/login';
    return this.http.post<any>(endPoint, credentials);
  }

   getUsuario() {

     if ( !this.usuario.id ) {
       this.validaToken();
     }

     return { ...this.usuario };

   }

   async guardarToken( token: string ) {
     this.token = token;
     await this.storage.set('token', token);
     //await this.validaToken();
   }

   async cargarToken() {

     this.token = await this.storage.get('token') || null;
   }

   getInformacion(): UsuarioModel {
    this.cargarToken();
    const informacionUsuario = JSON.parse(atob(this.token.split('.')[1]));
    return informacionUsuario;
   }

   getToken(): string {
    this.cargarToken();
    return this.token;
   }


   async validaToken(): Promise<boolean> {

     await this.cargarToken();

     if ( !this.token ) {
       this.navCtrl.navigateRoot('/login');
       return Promise.resolve(false);
     }
 
 
     return new Promise<boolean>( resolve => {
 
       const headers = new HttpHeaders({
         'x-token': this.token
       });
 
       this.http.get(`${ URL }/user/`, { headers })
         .subscribe( resp => {
 
           if ( resp['ok'] ) {
             this.usuario = resp['usuario'];
             resolve(true);
           } else {
             this.navCtrl.navigateRoot('/login');
             resolve(false);
           }
 
         });
 
 
     });
 
   }
 
 
   actualizarUsuario( usuario: UsuarioModel ) {
 
 
     const headers = new HttpHeaders({
       'x-token': this.token
     });
 
 
     return new Promise( resolve => {
 
       this.http.post(`${ URL }/user/update`, usuario, { headers })
         .subscribe( resp => {
 
           if ( resp['ok'] ) {
             this.guardarToken( resp['token'] );
             resolve(true);
           } else {
             resolve(false);
           }
 
         });
 
     });
 
 
 
   }
 
 
 }
 