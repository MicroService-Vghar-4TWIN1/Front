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

  { path: 'ressources', loadChildren: () => import('./ressource/ressource.module').then(m => m.RessourceModule) },
    { path: 'universite', loadChildren: () => import('./universite/universite.module').then(m => m.UniversiteModule) },






  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path :'**', component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
