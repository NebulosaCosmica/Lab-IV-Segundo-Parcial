import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliMostraMComponent } from './cli-mostra-m.component';

describe('CliMostraMComponent', () => {
  let component: CliMostraMComponent;
  let fixture: ComponentFixture<CliMostraMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliMostraMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliMostraMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
