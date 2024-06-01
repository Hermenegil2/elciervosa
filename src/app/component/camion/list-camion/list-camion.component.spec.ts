import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCamionComponent } from './list-camion.component';

describe('ListCamionComponent', () => {
  let component: ListCamionComponent;
  let fixture: ComponentFixture<ListCamionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCamionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListCamionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
