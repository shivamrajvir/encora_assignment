import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentRoutingModule } from './student-routing.module';
import { StudentNoticeListingComponent } from './student-notice-listing/student-notice-listing.component';
import { MaterialModules } from '../material.modules';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [StudentNoticeListingComponent],
  imports: [CommonModule, StudentRoutingModule, MaterialModules, FormsModule],
})
export class StudentModule {}
