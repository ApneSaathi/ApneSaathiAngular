import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportLogComponent } from './import-log.component';

describe('ImportLogComponent', () => {
  let component: ImportLogComponent;
  let fixture: ComponentFixture<ImportLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
