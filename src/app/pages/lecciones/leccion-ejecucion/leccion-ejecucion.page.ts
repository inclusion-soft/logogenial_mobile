import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-leccion-ejecucion',
  templateUrl: './leccion-ejecucion.page.html',
  styleUrls: ['./leccion-ejecucion.page.scss'],
})
export class LeccionEjecucionPage implements OnInit {

  leccionId = null;
  constructor(private activatedRoute: ActivatedRoute) { }

 ngOnInit() {
   this.leccionId = this.activatedRoute.snapshot.paramMap.get('id');
 }
 
}
