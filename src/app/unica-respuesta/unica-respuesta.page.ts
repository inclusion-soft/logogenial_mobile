import { Component, OnInit } from '@angular/core';
import { ToastController, ModalController } from '@ionic/angular';
import { MensajeRespuestaModalPage } from '../mensaje-respuesta-modal/mensaje-respuesta-modal.page';

@Component({
  selector: 'app-unica-respuesta',
  templateUrl: './unica-respuesta.page.html',
  styleUrls: ['./unica-respuesta.page.scss'],
})
export class UnicaRespuestaPage implements OnInit {
  
  goal: any;
  selected: any;
  dataReturned:any;
  
  constructor(public toastController: ToastController, public modalController: ModalController) { }

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
    const modal = await this.modalController.create({
      component: MensajeRespuestaModalPage,
      componentProps: {
        "paramID": 123,
        "paramTitle": "Test Title"
      }
    });
 
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
 
    return await modal.present();
  }

  // async mostrarMensaje(mensaje: string, tipo: string) {
  //   const toast = await this.toastController.create({
  //     // header: 'Toast header',
  //     message: mensaje,
  //     position: 'top',
  //     buttons: [
  //       {
  //         side: 'start',
  //         icon: 'star',
  //         text: 'Favorite',
  //         cssClass: "toastOk",
  //         handler: () => {
  //           console.log('Favorite clicked');
  //         }
  //       }, {
  //         text: 'Ok',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   toast.present();
  // }

  onOptChange(event){
    debugger;
    this.selected = event.detail.value;
  }

}
