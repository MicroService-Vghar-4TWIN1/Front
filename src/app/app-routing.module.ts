import { ContratModule } from './contrat/contrat.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContratListComponent } from './contrat/contrat-list/contrat-list.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';

const routes: Routes = [

  {path: 'home' , component: HomeComponent},
  {path : 'contrats',
    loadChildren: () => import('./contrat/contrat.module').then(m => m.ContratModule),
  },




  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path :'**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
