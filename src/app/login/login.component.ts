import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';
import { AuthenticationRequest } from '../model/authentication-request';
import { DecodedToken, KeycloakService } from '../service/keyclock.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',   
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string = ''; // Declare username property
  password: string = ''; // Declare password property
  userInfo: DecodedToken | null = null;

  authRequest: AuthenticationRequest = {email: '', password: ''};
  errorMsg: Array<string> = [];

  constructor(
    private ss: KeycloakService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.ss.init();
    await this.ss.login();
    this.userInfo = this.ss.getDecodedToken();
    console.log('Token payload:', this.userInfo);
  }
}
