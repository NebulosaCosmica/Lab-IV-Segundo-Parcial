import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerMatComponent } from './ver-mat.component';

describe('VerMatComponent', () => {
  let component: VerMatComponent;
  let fixture: ComponentFixture<VerMatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerMatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerMatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
