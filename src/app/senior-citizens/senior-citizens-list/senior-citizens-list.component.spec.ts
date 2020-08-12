import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorCitizensListComponent } from './senior-citizens-list.component';

describe('SeniorCitizensListComponent', () => {
  let component: SeniorCitizensListComponent;
  let fixture: ComponentFixture<SeniorCitizensListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorCitizensListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorCitizensListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
