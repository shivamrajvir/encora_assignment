import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StudentNoticeListingComponent } from './student-notice-listing/student-notice-listing.component';

const routes: Routes = [
  { path: 'listing', component: StudentNoticeListingComponent },
  { path: '', redirectTo: 'listing', pathMatch: 'full' },
  { path: '**', redirectTo: 'listing' }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
