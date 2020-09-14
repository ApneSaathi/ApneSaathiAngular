import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignVolunteersComponent } from './assign-volunteers.component';

describe('AssignVolunteersComponent', () => {
  let component: AssignVolunteersComponent;
  let fixture: ComponentFixture<AssignVolunteersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignVolunteersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
