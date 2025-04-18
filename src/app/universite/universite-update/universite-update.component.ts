import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UniversiteService, Universite } from '../../service/universite.service';
import * as L from 'leaflet';

@Component({
  selector: 'app-universite-update',
  templateUrl: './universite-update.component.html',
  styleUrls: ['./universite-update.component.css']
})
export class UniversiteUpdateComponent implements OnInit {
  universiteForm: FormGroup;
  locationForm: FormGroup;
  universiteId!: number;
  showLocationForm = false;
  mapLink: string | null = null;
  map!: L.Map;
  mainMarker!: L.Marker;

  constructor(
    private fb: FormBuilder,
    private universiteService: UniversiteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.universiteForm = this.fb.group({
      nomUniv: ['', Validators.required]
    });

    this.locationForm = this.fb.group({
      latitude: ['', [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/)]],
      longitude: ['', [Validators.required, Validators.pattern(/^-?\d+\.?\d*$/)]]
    });
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.universiteId = +idParam;
      this.universiteService.getById(this.universiteId).subscribe(univ => {
        this.universiteForm.patchValue(univ);
        if (univ.latitude && univ.longitude) {
          this.locationForm.patchValue({
            latitude: univ.latitude,
            longitude: univ.longitude
          });
        }
        this.loadMapLink();
      });
    }
  }


  initMap(lat = 34, lng = 9): void {
  if (this.map) this.map.remove();

  this.map = L.map('univMap').setView([lat, lng], 7);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap contributors'
  }).addTo(this.map);

  this.mainMarker = L.marker([lat, lng], {
    draggable: true,
    icon: L.icon({
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    })
  }).addTo(this.map);

  this.mainMarker.on('dragend', () => {
    const coords = this.mainMarker.getLatLng();
    this.locationForm.patchValue({
      latitude: coords.lat,
      longitude: coords.lng
    });
  });

  this.map.on('click', (e: L.LeafletMouseEvent) => {
    this.mainMarker.setLatLng(e.latlng);
    this.locationForm.patchValue({
      latitude: e.latlng.lat,
      longitude: e.latlng.lng
    });
  });

  setTimeout(() => this.map.invalidateSize(), 300);
}


toggleLocationForm(): void {
  this.showLocationForm = !this.showLocationForm;
  if (this.showLocationForm) {
    const lat = this.locationForm.get('latitude')?.value || 34;
    const lng = this.locationForm.get('longitude')?.value || 9;
    setTimeout(() => this.initMap(lat, lng), 300);
  }
}

getCurrentPosition(): void {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        this.locationForm.patchValue({ latitude: lat, longitude: lng });

        if (this.map && this.mainMarker) {
          this.mainMarker.setLatLng([lat, lng]);
          this.map.setView([lat, lng], 13);
        }

      },
      (error) => {
        console.error("Erreur de géolocalisation :", error);
        alert("Impossible de récupérer votre position actuelle.");
      },
      {
        enableHighAccuracy: true, // ✅ request best accuracy
        timeout: 10000,           // 10s timeout
        maximumAge: 0             // Don't reuse old data
      }
    );
  } else {
    alert("La géolocalisation n’est pas supportée par ce navigateur.");
  }
}




// universite-update.component.ts
updateLocation(): void {
  if (this.locationForm.valid) {
    const { latitude, longitude } = this.locationForm.value;

    this.universiteService.updateLocation(
      this.universiteId,
      parseFloat(latitude),
      parseFloat(longitude)
    ).subscribe({
      next: (updatedUniv) => {
        // Update the form with the new values
        this.locationForm.patchValue({
          latitude: updatedUniv.latitude,
          longitude: updatedUniv.longitude
        });
        alert('Localisation mise à jour avec succès!');
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour:', err);
        alert('Erreur lors de la mise à jour de la localisation');
      }
    });
  }
}

loadMapLink(): void {
  const univ = this.universiteForm.value;
  if (univ.latitude && univ.longitude) {
    this.mapLink = `https://www.google.com/maps?q=${univ.latitude},${univ.longitude}`;
  } else {
    this.mapLink = null;
  }
}

onSubmit(): void {
  if (this.universiteForm.valid) {
    const updatedUniversite: Universite = {
      idUniv: this.universiteId,
      ...this.universiteForm.value,
      latitude: parseFloat(this.locationForm.get('latitude')?.value),
      longitude: parseFloat(this.locationForm.get('longitude')?.value)
    };

    this.universiteService.update(updatedUniversite).subscribe(() => {
      this.router.navigate(['/universite']);
    });
  }
}



  cancel(): void {
    this.router.navigate(['/universite']);
  }
}
