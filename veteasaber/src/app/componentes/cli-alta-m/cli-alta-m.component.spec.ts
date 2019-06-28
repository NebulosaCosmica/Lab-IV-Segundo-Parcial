import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliAltaMComponent } from './cli-alta-m.component';

describe('CliAltaMComponent', () => {
  let component: CliAltaMComponent;
  let fixture: ComponentFixture<CliAltaMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliAltaMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliAltaMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
