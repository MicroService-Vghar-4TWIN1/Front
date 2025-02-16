import { NgModule } from '@angular/core';
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


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    NotfoundComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContratModule,
    EquipeModule,
    DepartementModule,
    FormationModule,
    UniversiteModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
