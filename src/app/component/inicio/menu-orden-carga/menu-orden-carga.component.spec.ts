import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuOrdenCargaComponent } from './menu-orden-carga.component';

describe('MenuOrdenCargaComponent', () => {
  let component: MenuOrdenCargaComponent;
  let fixture: ComponentFixture<MenuOrdenCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuOrdenCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuOrdenCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
