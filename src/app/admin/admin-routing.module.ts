import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AdminNoticeListingComponent } from './admin-notice-listing/admin-notice-listing.component';
import { AddEditNoticeComponent } from './add-edit-notice/add-edit-notice.component';

const routes: Routes = [
  { path: 'listing', component: AdminNoticeListingComponent },
  { path: 'add', component: AddEditNoticeComponent },
  { path: 'edit', component: AddEditNoticeComponent },
  { path: '', redirectTo: 'listing', pathMatch: 'full' },
  { path: '**', redirectTo: 'listing' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
