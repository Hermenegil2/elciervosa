import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPropietarioComponent } from './list-propietario.component';

describe('ListPropietarioComponent', () => {
  let component: ListPropietarioComponent;
  let fixture: ComponentFixture<ListPropietarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPropietarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPropietarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
