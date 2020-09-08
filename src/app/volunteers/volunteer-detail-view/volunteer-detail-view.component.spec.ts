import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunteerDetailViewComponent } from './volunteer-detail-view.component';

describe('VolunteerDetailViewComponent', () => {
  let component: VolunteerDetailViewComponent;
  let fixture: ComponentFixture<VolunteerDetailViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolunteerDetailViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolunteerDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
