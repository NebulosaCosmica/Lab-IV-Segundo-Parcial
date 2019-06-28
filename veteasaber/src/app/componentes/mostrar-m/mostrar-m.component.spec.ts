import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarMComponent } from './mostrar-m.component';

describe('MostrarMComponent', () => {
  let component: MostrarMComponent;
  let fixture: ComponentFixture<MostrarMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MostrarMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MostrarMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
