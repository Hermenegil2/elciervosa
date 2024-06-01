import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaOrdenComponent } from './carga-orden.component';

describe('CargaOrdenComponent', () => {
  let component: CargaOrdenComponent;
  let fixture: ComponentFixture<CargaOrdenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaOrdenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaOrdenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
