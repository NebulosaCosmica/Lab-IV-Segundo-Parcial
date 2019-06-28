import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CliModMComponent } from './cli-mod-m.component';

describe('CliModMComponent', () => {
  let component: CliModMComponent;
  let fixture: ComponentFixture<CliModMComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CliModMComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CliModMComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
