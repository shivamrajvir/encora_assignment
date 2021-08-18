import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { iContact } from 'src/app/interfaces/company.model';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  contact: iContact;
  contactForm: FormGroup = undefined;

  constructor(private _activatedRoute: ActivatedRoute, private _router: Router, private companyService: CompanyService) { }

  ngOnInit(): void {
    // if (!this._activatedRoute.snapshot.params.id) {
    //   this._router.navigate(['companiesAndContacts']);
    // }
    if (this._activatedRoute.snapshot.params.id)
      this.contact = this.companyService.getObjFromCachedContactsObj(this._activatedRoute.snapshot.params.id);
    this.createFormGroup(this.contact);
  }

  createFormGroup(contactObj?) {
    this.contactForm = new FormGroup({
      name: new FormControl('', Validators.required),
      country: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
    });

    if (contactObj) {
      this.contactForm.patchValue(contactObj);
    }
  }

  saveContact() {
    if (this.contact !== undefined) {
        let obj: iContact = this.contactForm.value;
        obj.id = this.contact.id;
        this.companyService.setCachedContactObj(this.contact.id, obj);
        this.companyService.setCachedContact(this.contact.id, obj);
    } else {
      this.companyService.addCachedContact(this.contactForm.value);
    }
    this._router.navigate(['companiesAndContacts'])
  }

}
