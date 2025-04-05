import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ActivateAccountComponent } from './pages/activate-account/activate-account.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'activate-account',
    component: ActivateAccountComponent
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

