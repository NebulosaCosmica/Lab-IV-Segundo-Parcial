import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MuestraUsrComponent } from './muestra-usr.component';

describe('MuestraUsrComponent', () => {
  let component: MuestraUsrComponent;
  let fixture: ComponentFixture<MuestraUsrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuestraUsrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuestraUsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
