import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditNoticeComponent } from './add-edit-notice/add-edit-notice.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminNoticeListingComponent } from './admin-notice-listing/admin-notice-listing.component';
import { MaterialModules } from '../material.modules';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddEditNoticeComponent, AdminNoticeListingComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModules,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class AdminModule { }
