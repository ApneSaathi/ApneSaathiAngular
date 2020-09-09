import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferVolunteerComponent } from './transfer-volunteer.component';

describe('TransferVolunteerComponent', () => {
  let component: TransferVolunteerComponent;
  let fixture: ComponentFixture<TransferVolunteerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransferVolunteerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransferVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
