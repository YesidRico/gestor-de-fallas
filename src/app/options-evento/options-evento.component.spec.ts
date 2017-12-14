import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsEventoComponent } from './options-evento.component';

describe('OptionsEventoComponent', () => {
  let component: OptionsEventoComponent;
  let fixture: ComponentFixture<OptionsEventoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsEventoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
