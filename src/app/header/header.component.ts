import { KeycloakService } from './../service/keyclock.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit  {
  roles: string[] = [];

  constructor(private KeycloakService: KeycloakService) {}



  ngOnInit(): void {
    this.roles = this.KeycloakService.getRoles();
  }

  hasRole(role: string): boolean {
    return this.roles.includes(role);
  }

  
  logout(): void {
    this.KeycloakService.logout();
  }
  



}
