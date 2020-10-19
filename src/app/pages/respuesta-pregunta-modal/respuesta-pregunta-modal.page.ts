import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { LeccionesService } from 'src/app/services/lecciones.service';

@Component({
  selector: 'app-respuesta-pregunta-modal',
  templateUrl: './respuesta-pregunta-modal.page.html',
  styleUrls: ['./respuesta-pregunta-modal.page.scss'],
})
export class RespuestaPreguntaModalPage implements OnInit {

  constructor(private modalCtrl: ModalController,
              private leccionService: LeccionesService) { }

  @Input() leccionId: any;
  @Input() pregunta: any;
  @Input() respuesta: any;

  ngOnInit() {
  }

  salirSinArgumentos() {
    this.modalCtrl.dismiss();
  }

}
