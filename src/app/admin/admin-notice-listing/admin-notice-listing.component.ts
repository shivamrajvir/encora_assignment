import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { iNotice } from 'src/app/interfaces/notice.model';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-admin-notice-listing',
  templateUrl: './admin-notice-listing.component.html',
  styleUrls: ['./admin-notice-listing.component.scss'],
})
export class AdminNoticeListingComponent implements OnInit {
  private userType: string = '';

  public allowActions: boolean = false;
  public noticeList: iNotice[];
  public displayedColumnsForNotices = ['title', 'description', 'uploadDate'];

  @ViewChild(MatTable, { static: false }) table;

  constructor(private noticeService: NoticeService, private _router: Router) {}

  ngOnInit(): void {
    this.userType = localStorage.getItem('type');
    // if (this.userType) {
    this.allowActions = this.userType === 'admin';
    if (this.allowActions) {
      this.displayedColumnsForNotices.push('actions');
    }
    // }
    this.getNotices();
  }

  getNotices() {
    this.noticeService
      .getNotices()
      .pipe(take(1))
      .subscribe((notices: iNotice[]) => {
        this.noticeList = notices;
      });
  }

  editNotice(noticeIndex) {
    this.noticeService.noticeToEdit = this.noticeList[noticeIndex];
    this._router.navigate(['noticeForAdmin/edit/']);
  }

  deleteNotice(noticeIndex) {
    this.noticeService
      .deleteNotice(this.noticeList[noticeIndex].id)
      .pipe(take(1))
      .subscribe(
        (success) => {
          this.noticeList.splice(noticeIndex, 1);
          this.table.renderRows();
          this.noticeService.showNotification('notice was deleted', 'success');
        },
        (error) => {
          this.noticeService.showNotification(
            'notice was not deleted',
            'error'
          );
        }
      );
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['login']);
  }

  addNotice() {
    this._router.navigate(['noticeForAdmin/add']);
  }
}
