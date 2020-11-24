import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UnicaRespuestaPage } from './unica-respuesta.page';

describe('UnicaRespuestaPage', () => {
  let component: UnicaRespuestaPage;
  let fixture: ComponentFixture<UnicaRespuestaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnicaRespuestaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UnicaRespuestaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
