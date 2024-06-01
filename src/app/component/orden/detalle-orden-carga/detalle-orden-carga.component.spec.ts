import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleOrdenCargaComponent } from './detalle-orden-carga.component';

describe('DetalleOrdenCargaComponent', () => {
  let component: DetalleOrdenCargaComponent;
  let fixture: ComponentFixture<DetalleOrdenCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleOrdenCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleOrdenCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
