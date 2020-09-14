import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeBoardVolunteerComponent } from './de-board-volunteer.component';

describe('DeBoardVolunteerComponent', () => {
  let component: DeBoardVolunteerComponent;
  let fixture: ComponentFixture<DeBoardVolunteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeBoardVolunteerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeBoardVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
