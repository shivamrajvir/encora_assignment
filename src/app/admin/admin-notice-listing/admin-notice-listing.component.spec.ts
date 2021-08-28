import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminNoticeListingComponent } from './admin-notice-listing.component';

describe('AdminNoticeListingComponent', () => {
  let component: AdminNoticeListingComponent;
  let fixture: ComponentFixture<AdminNoticeListingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminNoticeListingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminNoticeListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
