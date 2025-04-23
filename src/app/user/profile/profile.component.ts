import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { KeycloakService, DecodedToken } from './../../service/keyclock.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userInfo: DecodedToken | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private keycloakService: KeycloakService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const initialized = await this.keycloakService.init();
      if (initialized) {
        this.userInfo = this.keycloakService.getDecodedToken();
        console.log('Profile data:', this.userInfo);
      } else {
        this.error = 'Failed to initialize authentication';
      }
    } catch (err) {
      this.error = 'Error loading profile information';
      console.error(err);
    } finally {
      this.loading = false;
      this.cdr.detectChanges(); // Trigger change detection
    }
  }

  hasUserInfo(): boolean {
    return this.userInfo !== null && !this.loading && !this.error;
  }
}