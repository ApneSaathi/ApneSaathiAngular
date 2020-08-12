import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorCitizensComponent } from './senior-citizens.component';

describe('SeniorCitizensComponent', () => {
  let component: SeniorCitizensComponent;
  let fixture: ComponentFixture<SeniorCitizensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorCitizensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorCitizensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
