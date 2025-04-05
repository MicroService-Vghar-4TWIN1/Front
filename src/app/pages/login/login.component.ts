import { Component, OnInit } from '@angular/core';
import { AuthenticationRequest } from '../../services/models/authentication-request';
import { KeycloakService } from '../../services/keycloak/keycloak.service';
import { Router } from '@angular/router';
import { TokenService } from '../../services/token/token.service';
import { AuthenticationService } from 'src/app/services/services';
import { AuthenticationResponse } from 'src/app/services/models/authentication-response'; // ✅ à adapter si chemin différent

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authRequest: AuthenticationRequest = { email: '', password: '' };
  errorMsg: Array<string> = [];

  constructor(
    private ss: KeycloakService,
    private router: Router,
    private authService: AuthenticationService,
    private tokenService: TokenService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.ss.init();
    await this.ss.login();
  }

  login() {
    this.errorMsg = [];
    this.authService.authenticate({
      body: this.authRequest
    }).subscribe({
      next: (res: AuthenticationResponse) => {
        if (res.token) {
          this.tokenService.token = res.token;
          this.router.navigate(['home']);
        } else {
          this.errorMsg.push("Échec de l'authentification : token manquant.");
        }
      },
      error: (err: any) => {
        console.log(err);
        if (err.error.validationErrors) {
          this.errorMsg = err.error.validationErrors;
        } else {
          this.errorMsg.push(err.error.errorMsg || 'Erreur inconnue');
        }
      }
    });
  }

  register() {
    this.router.navigate(['register']);
  }
}
