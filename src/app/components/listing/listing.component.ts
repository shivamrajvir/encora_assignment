import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { iCompany, iContact } from 'src/app/interfaces/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  companies: iCompany[] = [];
  displayedColumnsForCompanies = [];

  contacts: iContact[] = [];
  displayedColumnsForContacts = [];

  @ViewChild(MatTable, { static: false }) table;

  constructor(
    private companyService: CompanyService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.getContacts();
    this.getCompanies();
  }

  getCompanies(): void {
    this.companyService
      .getCompanies()
      .pipe(take(1))
      .subscribe((companies: iCompany[]) => {
        this.companies = companies;
        this.displayedColumnsForCompanies = Object.keys(companies[0]);
      });
  }

  getContacts(): void {
    this.companyService
      .getContacts()
      .pipe(take(1))
      .subscribe((contacts: iContact[]) => {
        this.contacts = contacts;
        this.displayedColumnsForContacts = Object.keys(contacts[0]);
        this.displayedColumnsForContacts.push('actions');
      });
  }

  addContact() {
    this._router.navigate(['details']);
  }

  editContact(element) {
    this._router.navigate(['details/' + element.id]);
  }

  deleteContact(contactIndex) {
    this.contacts.splice(contactIndex, 1);
    this.table.renderRows();
  }
}
