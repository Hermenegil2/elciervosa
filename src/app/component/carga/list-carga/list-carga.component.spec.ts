import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCargaComponent } from './list-carga.component';

describe('ListCargaComponent', () => {
  let component: ListCargaComponent;
  let fixture: ComponentFixture<ListCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
