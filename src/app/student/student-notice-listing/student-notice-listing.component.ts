import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { iNotice } from 'src/app/interfaces/notice.model';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-student-notice-listing',
  templateUrl: './student-notice-listing.component.html',
  styleUrls: ['./student-notice-listing.component.scss'],
})
export class StudentNoticeListingComponent implements OnInit {
  public searchString = '';
  public allowActions: boolean = false;
  public noticeList: any;
  public displayedColumnsForNotices = ['title', 'description', 'uploadDate'];

  private userType: string = '';
  private allNoticeList: iNotice[];

  @ViewChild(MatTable, { static: false }) table;
  @ViewChild(MatSort) sort: MatSort;

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
        this.noticeList = new MatTableDataSource(notices);
        this.noticeList.sort = this.sort;
        this.allNoticeList = notices;
      });
  }

  filterNotices() {
    this.noticeList = new MatTableDataSource(
      this.allNoticeList.filter((notice) =>
        notice.title.includes(this.searchString.trim())
      )
    );
    this.noticeList.sort = this.sort;
  }

  logout() {
    localStorage.clear();
    this._router.navigate(['login']);
  }
}
