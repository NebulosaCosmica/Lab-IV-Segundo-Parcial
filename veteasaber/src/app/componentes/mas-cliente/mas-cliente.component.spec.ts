import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasClienteComponent } from './mas-cliente.component';

describe('MasClienteComponent', () => {
  let component: MasClienteComponent;
  let fixture: ComponentFixture<MasClienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasClienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
