import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { iNotice } from 'src/app/interfaces/notice.model';
import { NoticeService } from 'src/app/services/notice.service';

@Component({
  selector: 'app-add-edit-notice',
  templateUrl: './add-edit-notice.component.html',
  styleUrls: ['./add-edit-notice.component.scss'],
})
export class AddEditNoticeComponent implements OnInit {
  notice: iNotice = undefined;
  noticeForm: FormGroup = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
  });

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
    private noticeService: NoticeService
  ) {}

  ngOnInit(): void {
    if (this._activatedRoute.snapshot.routeConfig.path === 'edit') {
      this.notice = this.noticeService.noticeToEdit;
    } else {
      this._router.navigate(['noticeForAdmin/listing']);
    }
    this.createFormGroup(this.notice);
  }

  createFormGroup(noticeObj?) {
    this.noticeForm = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    });

    if (noticeObj) {
      this.noticeForm.patchValue(noticeObj);
    }
  }

  saveNotice() {
    if (this.notice === undefined) {
      let noticeObj = this.noticeForm.value;
      noticeObj.uploadDate = new Date().toISOString();
      this.noticeService
        .addNotice(noticeObj)
        .pipe(take(1))
        .subscribe(
          (data) => {
            this.noticeService.showNotification(
              'Notice has been added',
              'success'
            );
            this._router.navigate(['noticeForAdmin/listing']);
          },
          (error) => {
            this.noticeService.showNotification(
              'Unable to add notice',
              'error'
            );
            this._router.navigate(['noticeForAdmin/listing']);
          }
        );
    } else {
      this.notice.title = this.noticeForm.value.title;
      this.notice.description = this.noticeForm.value.description;
      this.noticeService
        .editNotice(this.notice, this.notice.id)
        .pipe(take(1))
        .subscribe(
          (data) => {
            this.noticeService.showNotification(
              'Notice has been updated',
              'success'
            );
            this._router.navigate(['noticeForAdmin/listing']);
          },
          (error) => {
            this.noticeService.showNotification(
              'Unable to update notice',
              'error'
            );
            this._router.navigate(['noticeForAdmin/listing']);
          }
        );
    }
  }
}
