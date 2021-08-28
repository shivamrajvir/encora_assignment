import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentNoticeListingComponent } from './student-notice-listing.component';

describe('StudentNoticeListingComponent', () => {
  let component: StudentNoticeListingComponent;
  let fixture: ComponentFixture<StudentNoticeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudentNoticeListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentNoticeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
