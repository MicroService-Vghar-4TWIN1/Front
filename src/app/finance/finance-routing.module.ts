import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFinanceComponent } from './list-finance/list-finance.component';
import { AddFinanceComponent } from './add-finance/add-finance.component';
import { EditFinanceComponent } from './edit-finance/edit-finance.component';

const routes: Routes = [
  {path:'', component: ListFinanceComponent},
      {path:'add', component: AddFinanceComponent},
      {path:'update/:id', component: EditFinanceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
