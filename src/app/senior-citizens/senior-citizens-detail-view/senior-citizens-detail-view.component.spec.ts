import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeniorCitizensDetailViewComponent } from './senior-citizens-detail-view.component';

describe('SeniorCitizensDetailViewComponent', () => {
  let component: SeniorCitizensDetailViewComponent;
  let fixture: ComponentFixture<SeniorCitizensDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeniorCitizensDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeniorCitizensDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
