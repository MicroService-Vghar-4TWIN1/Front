import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AddFinanceComponent } from './add-finance/add-finance.component';
import { EditFinanceComponent } from './edit-finance/edit-finance.component';
import { ListFinanceComponent } from './list-finance/list-finance.component';


@NgModule({
  declarations: [
    AddFinanceComponent,
    EditFinanceComponent,
    ListFinanceComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FinanceRoutingModule
  ]
})
export class FinanceModule { }
