import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {map} from 'rxjs/operators';
import { iUser } from '../interfaces/users.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  routesHash = {
    users: 'http://localhost:3000/users'
  };

  constructor(private _http: HttpClient) { }

  getUsers(): Observable<iUser[]> {
    return this._http.get(this.routesHash.users).pipe(map((users: iUser[]) => {
      return users;
    }))
  }
}
