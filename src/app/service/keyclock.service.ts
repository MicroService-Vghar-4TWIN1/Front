import Keycloak from 'keycloak-js';
import { UserProfile } from '../model/user-profile';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloakInstance: Keycloak.KeycloakInstance;
  private profile?: UserProfile;

  constructor() {
    // Add 'new' keyword here
    this.keycloakInstance = new Keycloak({
      url: 'http://localhost:8092',
      realm: 'projet',
      clientId: 'microservice'
    });
  }

  get instance(): Keycloak.KeycloakInstance {
    return this.keycloakInstance;
  }

  async init(): Promise<boolean> {
    try {
      const authenticated = await this.keycloakInstance.init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
        checkLoginIframe: false
      });

      if (authenticated) {
        this.profile = await this.keycloakInstance.loadUserProfile() as UserProfile;
        this.profile.token = this.keycloakInstance.token || '';
      }
      return authenticated;
    } catch (error) {
      console.error('Keycloak initialization failed', error);
      return false;
    }
  }

  login() {
    return this.keycloakInstance.login();
  }

  logout() {
    return this.keycloakInstance.logout({ redirectUri: 'http://localhost:4200' });
  }

  isTokenExpired(): boolean {
    return this.keycloakInstance.isTokenExpired();
  }
}