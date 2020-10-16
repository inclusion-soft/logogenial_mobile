import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { LeccionModel } from '../models/leccion-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class LeccionesService  {

  urlService = 'v1/lecciones-api';
  constructor(private http: HttpClient) {
    this.urlService = environment.url + this.urlService;
  }

  findAllByGrupoNivelTemaId(grupoNivelTemaId: number): Observable<LeccionModel[]> {
    const endpoint = this.urlService +  '/findAllByGrupoNivelTemaId/' + grupoNivelTemaId;
    return this.http.get<LeccionModel[]>(endpoint);
  }

  findAllByEstudianteId(estudianteId: number): Observable<LeccionModel[]> {
    const endpoint = this.urlService +  '/findAllByGrupoNivelTemaId/' + estudianteId;
    return this.http.get<LeccionModel[]>(endpoint);
  }

  findAll(): Observable<LeccionModel[]> {
    const endpoint = this.urlService +  '/findAll';
    return this.http.get<LeccionModel[]>(endpoint);
  }
}
