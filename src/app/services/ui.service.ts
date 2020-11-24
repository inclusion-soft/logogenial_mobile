import { Injectable } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  constructor( private alertController: AlertController,
               private toastController: ToastController ) { }


  async alertaInformativa( message: string ) {
    const alert = await this.alertController.create({
      message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast( message: string ) {
    const toast = await this.toastController.create({
      message,
      position: 'top',
      duration: 1500
    });
    toast.present();
  }

  getFechaClientFormat(fechaString: string) {
    if (fechaString == null || fechaString == '') {
      return null;
    }
    return moment(fechaString, 'DD-MM-YYYY');
  }

  convertStringToDate(dateString: string) {
      const format = 'YYYY-MM-DD';
      const dateConvert = moment(dateString.substring(0,10), format);
      return moment(dateConvert, 'YY-MM-DD').toDate();
    }

    convertStringToDateCustom(dateString: string, format: string = '') {
      if (!dateString || dateString == null) {
        return moment(new Date(), format).toDate();
      }
  
      if (typeof dateString == 'string') {
        dateString = dateString.replace(/-/g, '/');
      }
  
      if (dateString.split('/')[0].length < 4) {
        format = 'DD-MM-YYYY HH:mm:ss'
      } else {
        format = 'YYYY-MM-DD HH:mm:ss'
      }
  
      const dateConvert = moment(dateString, format);
      return moment(dateConvert, format).toDate();
    }

    convertDateToString(dateString: any, format: string = null): string {
      if (!format) {
        format = 'YYYY/MM/DD';
      }
  
      if (typeof dateString == 'string') {
        dateString = this.convertStringToDateCustom(dateString, format);
      }
  
      return moment(dateString).format(format).toString();
    }

  convertStringToDateFormat(dateString: string, format: string = '') {
    if (!dateString || dateString == null) {
      return moment(new Date(), format).toDate();
    }

    if (typeof dateString == 'string') {
      dateString = dateString.replace(/-/g, '/');
    }

    if (dateString.split('/')[0].length < 4) {
      format = 'DD-MM-YYYY HH:mm:ss'
    } else {
      format = 'YYYY-MM-DD HH:mm:ss'
    }

    const dateConvert = moment(dateString, format);
    return moment(dateConvert, format).toDate();
  }

}
