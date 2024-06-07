import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteOrdenCargaComponent } from './reporte-orden-carga.component';

describe('ReporteOrdenCargaComponent', () => {
  let component: ReporteOrdenCargaComponent;
  let fixture: ComponentFixture<ReporteOrdenCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteOrdenCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteOrdenCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
