import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCargaComponent } from './add-carga.component';

describe('AddCargaComponent', () => {
  let component: AddCargaComponent;
  let fixture: ComponentFixture<AddCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCargaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
