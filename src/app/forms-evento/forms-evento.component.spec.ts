import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormsEventoComponent } from './forms-evento.component';

describe('FormsEventoComponent', () => {
  let component: FormsEventoComponent;
  let fixture: ComponentFixture<FormsEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormsEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormsEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
