import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { iNotice } from '../interfaces/notice.model';

@Injectable({
  providedIn: 'root',
})
export class NoticeService {
  routesHash = {
    notices: 'http://localhost:3000/notices',
    addNotice: '',
  };

  noticeLength = 0;

  noticeToEdit: iNotice = undefined;

  constructor(private _http: HttpClient, private snackBar: MatSnackBar) {}

  getNotices(): Observable<iNotice[]> {
    return this._http.get(this.routesHash.notices).pipe(
      map((response: iNotice[]) => {
        this.noticeLength = response.length;
        return response;
      })
    );
  }

  addNotice(notice) {
    notice.id = this.noticeLength;
    return this._http.post(this.routesHash.notices, notice).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  editNotice(notice, id) {
    return this._http.put(this.routesHash.notices + '/' + id, notice).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteNotice(id) {
    return this._http.delete(this.routesHash.notices + '/' + id).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  showNotification(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
