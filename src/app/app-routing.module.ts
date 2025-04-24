import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'home',
    redirectTo: 'home',
    pathMatch: 'full'   // <-- important pour éviter les conflits
  },
  
  

      { path: 'login', component: LoginComponent },  // Page login sans header ni footer
 
 
  {
    path: '',
    component: MainLayoutComponent,  // Layout principal avec header et footer
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'notfound', component: NotfoundComponent },
      {path : 'contrats',
        loadChildren: () => import('./contrat/contrat.module').then(m => m.ContratModule),
      },
     
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
      { path: 'finance', loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule) },
      { path: 'formation',loadChildren: () => import('./formation/formation.module').then(m => m.FormationModule)},

    { path: 'ressources', loadChildren: () => import('./ressource/ressource.module').then(m => m.RessourceModule) },
    { path: 'universite', loadChildren: () => import('./universite/universite.module').then(m => m.UniversiteModule) },
    { path: 'departement', loadChildren: () => import('./departement/departement.module').then(m => m.DepartementModule) },




    { path: 'ressources', loadChildren: () => import('./ressource/ressource.module').then(m => m.RessourceModule) },
   
    { path: 'departement', loadChildren: () => import('./departement/departement.module').then(m => m.DepartementModule) },




      {path: 'equipe', loadChildren: () => import('./equipe/equipe.module').then(m => m.EquipeModule),}
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

