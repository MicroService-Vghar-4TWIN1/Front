import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ContratModule } from './contrat/contrat.module'; // Importez ContratModule
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EquipeModule } from './equipe/equipe.module';
import { DepartementModule } from './departement/departement.module';
import { FormationModule } from './formation/formation.module';
import { UniversiteModule } from './universite/universite.module';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FooterComponent } from './footer/footer.component';
import { RessourceModule } from './ressource/ressource.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { KeycloakService } from './service/keyclock.service';
import { HttpTokenInterceptor } from './service/interceptor/http-token.interceptor';


export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NotfoundComponent,
    FooterComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContratModule,
    EquipeModule,
    DepartementModule,
    FormationModule,
    UniversiteModule,
    RessourceModule,
    FormsModule,
    
    BrowserAnimationsModule,
    HttpClientModule

  ],
  providers: [
    HttpClient,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpTokenInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
