import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BasicModel } from '../models/basic-model';
import { AvancePreguntaModel } from '../models/avance-pregunta-model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  createAvancePregunta (avancePreguntaModel: AvancePreguntaModel): Observable<AvancePreguntaModel> {
    const endpoint = environment.url +  'v1/avance-pregunta-api';
    return this.http.post<AvancePreguntaModel>(endpoint, avancePreguntaModel, httpOptions);
  }

  findAllGroupsByEstudianteId(estudianteId: number): Observable<any> {
    const endpoint = environment.url +  'v1/avance-pregunta-api/findAllByEstudianteId/' + estudianteId;
    return this.http.get<BasicModel[]>(endpoint);
  }
}
