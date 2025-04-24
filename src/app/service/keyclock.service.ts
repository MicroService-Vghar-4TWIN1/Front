import Keycloak from 'keycloak-js';
import { UserProfile } from '../model/user-profile';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

export interface DecodedToken {
  sub: string;
  email?: string;
  email_verified?: boolean;
  preferred_username?: string;
  given_name?: string;
  family_name?: string;
  name?: string;
  matricule?: string;
  fonction?: string;
  realm_access?: {
    roles: string[];
  };
  [key: string]: any;
}

@Injectable({ providedIn: 'root' })
export class KeycloakService {
  private keycloakInstance: Keycloak.KeycloakInstance;
  private profile?: UserProfile;
  private initialized = false;
  private refreshInterval?: number;

  constructor() {
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
    if (this.initialized) {
      return true;
    }

    try {
      const authenticated = await this.keycloakInstance.init({
        onLoad: 'login-required',
        pkceMethod: 'S256',
        checkLoginIframe: false,
        enableLogging: true,
        flow: 'standard',
      });

      if (authenticated) {
        await this.loadUserProfile();
        this.setupTokenRefresh();
        this.initialized = true;
      }
      
      return authenticated;
    } catch (error) {
      console.error('Keycloak initialization failed', error);
      return false;
    }
  }

  private async loadUserProfile(): Promise<void> {
    try {
      this.profile = await this.keycloakInstance.loadUserProfile() as UserProfile;
      this.profile.token = this.keycloakInstance.token || '';
    } catch (error) {
      console.error('Failed to load user profile', error);
      throw error;
    }
  }

  private setupTokenRefresh(): void {
    // Clear existing interval if any
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }

    this.refreshInterval = window.setInterval(async () => {
      try {
        const refreshed = await this.keycloakInstance.updateToken(30);
        if (refreshed) {
          console.log('Token refreshed');
          await this.loadUserProfile(); // Update profile with new token
        }
      } catch (err) {
        console.error('Failed to refresh token', err);
      }
    }, 30000);
  }

  login(): Promise<void> {
    return this.keycloakInstance.login();
  }

  logout(): Promise<void> {
    return this.keycloakInstance.logout({ redirectUri: 'http://localhost:4200' });
  }

  isTokenExpired(): boolean {
    return this.keycloakInstance.isTokenExpired();
  }

  getDecodedToken(): DecodedToken | null {
    const token = this.keycloakInstance.token;
    if (!token) return null;
    
    try {
      return jwtDecode<DecodedToken>(token);
    } catch (error) {
      console.error('Failed to decode token', error);
      return null;
    }
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
  }


  getToken(): string | null {
    return this.keycloakInstance.token || null;
  }


  getRoles(): string[] {
    const decodedToken = this.getDecodedToken();
    if (decodedToken && decodedToken.realm_access && decodedToken.realm_access.roles) {
      return decodedToken.realm_access.roles;
    }
    return [];
  }
  
  
}

