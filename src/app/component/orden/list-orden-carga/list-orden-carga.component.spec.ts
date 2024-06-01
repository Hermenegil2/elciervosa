import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrdenCargaComponent } from './list-orden-carga.component';

describe('ListOrdenCargaComponent', () => {
  let component: ListOrdenCargaComponent;
  let fixture: ComponentFixture<ListOrdenCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListOrdenCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrdenCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
