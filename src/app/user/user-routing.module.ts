import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ListStudentComponent } from './list-student/list-student.component';
import { SignupComponent } from './signup/signup.component';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';

const routes: Routes = [
  {path:'profile', component: ProfileComponent},
  {path:'listStudent', component: ListStudentComponent},
  { path: 'signup', component: SignupComponent },
  { path: 'listeusers', component: AdminUserListComponent }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
