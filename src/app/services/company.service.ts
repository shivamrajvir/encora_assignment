import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { iCompany, iContact } from '../interfaces/company.model';

@Injectable({
	providedIn: 'root'
})
export class CompanyService {

	routesHash = {
		companies: 'https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/companies',
    contacts: 'https://my-json-server.typicode.com/bokadedarvin/AngularDeveloperSample/contacts'
	};

  private cachedContactsObj = {};

  private cachedContacts: iContact[] = [];

	constructor(private _http: HttpClient) { }

	getCompanies(): Observable<iCompany[]> {
		return this._http.get(this.routesHash.companies).pipe(map((response: iCompany[]) => {
			return response;
    }));
	}

/*
    get data from changed cache, or totally
*/
  getContacts(): Observable<iContact[]> {
    if (this.cachedContacts.length) {
      return of(this.cachedContacts);
    } else {
      return this._http.get(this.routesHash.contacts).pipe(map((response: iContact[]) => {
      response.forEach(contact => {
        this.cachedContactsObj[contact.id] = contact;
      });
      this.cachedContacts = response;
			return response;
    }));
    }
	}

  setCachedContactObj(id, obj) {
    this.cachedContactsObj[id] = obj;
  }

  /*
    Function to set into cached data, since it cannot be changed in api, used reverse loop as it is fastest way to access, also no variable needs and also only counts length once
*/
  setCachedContact(id, obj) {
    for (let index = this.cachedContacts.length - 1; index >= 0; index--) {
      if (this.cachedContacts[index].id === id) {
        this.cachedContacts[index] = obj;
        break;
      }
    }
  }

  addCachedContact(obj) {
    obj.id = this.cachedContacts.length + 1;
    this.cachedContacts.push(obj);
  }

  getObjFromCachedContactsObj(id) {
    return this.cachedContactsObj[id];
  }
}
