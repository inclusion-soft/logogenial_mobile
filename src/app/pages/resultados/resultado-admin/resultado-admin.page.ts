import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from 'src/app/services/data.service';
import { ResultadosPreguntaService } from 'src/app/services/resultados-pregunta.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { UsuarioModel } from 'src/app/models/usuario-model';
import { UiService } from 'src/app/services/ui.service';

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
              private uiService: UiService,
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
      const datosPuntajeAciertos = [];
      const datosPuntajeDesaciertos = [];
      const labels = [];
      let previo = 0;
      let banderaSinResultado = null;
      datos.forEach( (element) => {
        if (previo > 0 && previo === element.tipo) {
          banderaSinResultado = true;
          if (previo === 1) {
            datosPuntajeDesaciertos.push(0);
          }
        }

        if (element.tipo === 1) {
          datosPuntajeAciertos.push(element.cantidad);
        } else {
          datosPuntajeDesaciertos.push(element.cantidad);
        }

        if (banderaSinResultado === true) {
          if (previo === 0) {
            datosPuntajeAciertos.push(0);
          }
        }
        banderaSinResultado = null;

        const fecha = this.uiService.convertStringToDate(element.fecha.substring(0, 10));
        const fechaFormateada = this.uiService.convertDateToString(fecha, 'DD-MM');
        if (!labels.includes(fechaFormateada)) {
          labels.push(fechaFormateada);
        }
        previo = element.tipo;
      });
      this.chart = new Chart('daily', {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Acierto',
              backgroundColor: 'rgba(45, 211, 111, 1)',
              data: datosPuntajeAciertos
            }, {
              label: 'Fallos',
              backgroundColor: '#8e5ea2',
              data: datosPuntajeDesaciertos
            }
          ]
        },
        options: {
          title: {
            display: true,
            text: 'Actividad últimos días'
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
              backgroundColor: ['rgba(45, 211, 111, 1)', '#8e5ea2'],
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
