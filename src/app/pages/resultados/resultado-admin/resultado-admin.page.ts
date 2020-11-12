import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/app/services/data.service';
import { ResultadosPreguntaService } from 'src/app/services/resultados-pregunta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { UsuarioModel } from 'src/app/models/usuario-model';

@Component({
  selector: 'app-resultado-admin',
  templateUrl: './resultado-admin.page.html',
  styleUrls: ['./resultado-admin.page.scss'],
})
export class ResultadoAdminPage implements OnInit {
  chart: any;
  usuario: UsuarioModel = new UsuarioModel();
  totalHits = 0;
  constructor(private resultadoPreguntaService: ResultadosPreguntaService,
              private usuarioService: UsuarioService,
              private routerService: Router,
              private navCtrl: NavController) { }

  ngOnInit() {
    return Observable.fromPromise(this.handleCargarDatos());
  }

  private async handleCargarDatos()  {
    const informacionUsuario = await this.usuarioService.getInformacionPromise();
    this.usuario = informacionUsuario as any;
    if (this.usuario === null) {
      this.navCtrl.navigateRoot( '/login', { animated: true } );
      return;
    }
    this.cargarHitsResultadosPorEstudiante();
    this.cargarUltimosResultadosPorFechaPorEstudiante();
  }

  cargarUltimosResultadosPorFechaPorEstudiante() {
    const cantidadDias = 5;
    this.resultadoPreguntaService.findLastHitsByFechaAndUsuarioId(this.usuario.id, cantidadDias).subscribe( (datos: any[] ) =>  {
      const datosPuntaje = [];
      datos.forEach(element => {
        datosPuntaje.push()
      });
      
      datosPuntaje.push(datos[0].cantidad);
      datosPuntaje.push(datos[1].cantidad);
      this.totalHits = datosPuntaje[0] + datosPuntaje[1];
      this.chart = new Chart('daily', {
        type: 'bar',
        data: {
          labels: ["1900", "1950", "1999", "2050"],
          datasets: [
            {
              label: "Africa",
              backgroundColor: "#3e95cd",
              data: [133,221,783,2478]
            }, {
              label: "Europe",
              backgroundColor: "#8e5ea2",
              data: [408,547,675,734]
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Population growth (millions)'
          }
        }
      });
    }, err => {
      alert('error cargando datos');
    });
  }

  cargarHitsResultadosPorEstudiante() {
    this.resultadoPreguntaService.findAllByUsuarioId(this.usuario.id).subscribe(datos =>  {
      const datosPuntaje = [];
      datosPuntaje.push(datos[0].cantidad);
      datosPuntaje.push(datos[1].cantidad);
      this.totalHits = datosPuntaje[0] + datosPuntaje[1];
      this.chart = new Chart('canvas', {
        type: 'doughnut',
        data: {
          labels: ['Aciertos', 'Desaciertos'],
          datasets: [
            {
              data: datosPuntaje,
              backgroundColor: ['rgba(45, 211, 111, 1)', 'rgba(235, 68, 90, 0.5)'],
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: true
          },
          tooltips: {
            enabled: true
          },
          animation: {
            animateRotate: true
          }
        }
      });
    }, err => {
      alert('error cargando datos');
    });
  }

}
