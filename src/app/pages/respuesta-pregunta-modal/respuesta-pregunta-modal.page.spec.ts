import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RespuestaPreguntaModalPage } from './respuesta-pregunta-modal.page';

describe('RespuestaPreguntaModalPage', () => {
  let component: RespuestaPreguntaModalPage;
  let fixture: ComponentFixture<RespuestaPreguntaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RespuestaPreguntaModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RespuestaPreguntaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
