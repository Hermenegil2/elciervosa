import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteCamionesComponent } from './reporte-camiones.component';

describe('ReporteCamionesComponent', () => {
  let component: ReporteCamionesComponent;
  let fixture: ComponentFixture<ReporteCamionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteCamionesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReporteCamionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
