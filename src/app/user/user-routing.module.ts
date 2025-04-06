import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { ListStudentComponent } from './list-student/list-student.component';

const routes: Routes = [
  {path:'profile', component: ProfileComponent},
  {path:'listStudent', component: ListStudentComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
