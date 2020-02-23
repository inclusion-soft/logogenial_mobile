import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-unica-respuesta',
  templateUrl: './unica-respuesta.page.html',
  styleUrls: ['./unica-respuesta.page.scss'],
})
export class UnicaRespuestaPage implements OnInit {
  
  goal: any;
  selected: any;
  constructor(public toastController: ToastController) { }

  ngOnInit() {
    this.goal = 'Pera';
  }

  evaluar(event) {
    if(this.goal === this.selected) {
      // alert('ok');
      this.mostrarMensaje('Es correcto', 'success');
    }else  {
      // alert('error');
      this.mostrarMensaje('Lo siento, la respuesta correcta es:' + this.goal, 'error');
    }
  }

  async mostrarMensaje(mensaje: string, tipo: string) {
    const toast = await this.toastController.create({
      // header: 'Toast header',
      message: mensaje,
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          cssClass: "toastOk",
          handler: () => {
            console.log('Favorite clicked');
          }
        }, {
          text: 'Ok',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    toast.present();
  }

  onOptChange(event){
    debugger;
    this.selected = event.detail.value;
  }

}
