import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignSeniorCitizensComponent } from './assign-senior-citizens.component';

describe('AssignSeniorCitizensComponent', () => {
  let component: AssignSeniorCitizensComponent;
  let fixture: ComponentFixture<AssignSeniorCitizensComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignSeniorCitizensComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignSeniorCitizensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
