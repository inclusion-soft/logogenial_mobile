import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MensajeRespuestaModalPage } from './mensaje-respuesta-modal.page';

describe('MensajeRespuestaModalPage', () => {
  let component: MensajeRespuestaModalPage;
  let fixture: ComponentFixture<MensajeRespuestaModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MensajeRespuestaModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MensajeRespuestaModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
