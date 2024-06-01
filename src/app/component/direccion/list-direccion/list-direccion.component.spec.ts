import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDireccionComponent } from './list-direccion.component';

describe('ListDireccionComponent', () => {
  let component: ListDireccionComponent;
  let fixture: ComponentFixture<ListDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListDireccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
