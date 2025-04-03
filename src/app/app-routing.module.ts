import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthLayoutComponent,
    children: [
      { path: '', component: LoginComponent },  // Page login sans header ni footer
    ],
  },
  {
    path: '',
    component: MainLayoutComponent,  // Layout principal avec header et footer
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'notfound', component: NotfoundComponent },
      {path : 'contrats',
        loadChildren: () => import('./contrat/contrat.module').then(m => m.ContratModule),
      },
      { path: 'ressources', loadChildren: () => import('./ressource/ressource.module').then(m => m.RessourceModule) },
      { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
      { path: 'finance', loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule) },

    ],
  },
  { path: '**', redirectTo: 'notfound' },  // Route non trouvée
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

