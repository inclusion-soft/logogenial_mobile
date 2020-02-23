import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-unica-respuesta',
  templateUrl: './unica-respuesta.page.html',
  styleUrls: ['./unica-respuesta.page.scss'],
})
export class UnicaRespuestaPage implements OnInit {
  
  goal: any;
  selected: any;
  constructor() { }

  ngOnInit() {
    this.goal = 'Pera';
  }

  evaluar(event) {
    if(this.goal === this.selected) {
      alert('ok');
    }else  {
      alert('error');
    }
  }

  onOptChange(event){
    debugger;
    this.selected = event.detail.value;
  }

}
