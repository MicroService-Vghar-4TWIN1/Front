import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/payment-service.service';
import { Formation, FormationService } from 'src/app/service/formation.service';
import { loadStripe } from '@stripe/stripe-js';

@Component({
  selector: 'app-formation-detail',
  templateUrl: './formation-detail.component.html',
  styleUrls: ['./formation-detail.component.css']
})
export class FormationDetailComponent implements OnInit {
  formationId: string | null = null;
  formation: Formation | null = null;  
  stripe: any;
  stripePublishableKey: string = 'pk_test_51RB2h8PKaiZ7qH7RlKv0wNA4V96wIBahD3nl4KZrqqu9NArjjKdq7oyopS7N8XC0TZl5nnOEFIwuHX8RXMOYvUgh009FGQmkHl';

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private formationService: FormationService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    // Load Stripe.js and initialize it
    this.stripe = loadStripe(this.stripePublishableKey);

    // Get the formation ID from the route parameter
    this.formationId = this.route.snapshot.paramMap.get('id');
    
    if (this.formationId) {
      const id = Number(this.formationId);
      if (!isNaN(id)) {
        this.formationService.getFormation(id).subscribe((data) => {
          this.formation = data;
          console.log('Formation details:', this.formation);
        });
      } else {
        alert('Formation non trouvée.');
      }
    }
  }

  startPayment() {
    if (!this.formationId || !this.formation) {
      console.error('Formation ID or details are not available');
      return;
    }

    const formationId = Number(this.formationId);

    if (isNaN(formationId)) {
      console.error('Invalid formation ID');
      return;
    }

    // Ensure that 'prix' (price) is converted to a number, and assume 'prix' is in dollars
    const amount = Number(this.formation.prix) * 100; // Convert to cents

    if (isNaN(amount)) {
      console.error('Invalid price value');
      return;
    }

    const name = this.formation.nomFormation;

    // Call the payment service to create a checkout session
    this.paymentService.createCheckoutSession(formationId, amount, name).subscribe(
      (session: any) => {
        const sessionId = session.id;
        if (sessionId) {
          this.redirectToStripeCheckout(sessionId);
          this.decrementPlaces(formationId);

        }
      },
      (error) => {
        console.error('Error creating checkout session:', error);
      }
    );
  }

  editFormation(id: string | null) {
    if (id) {
      this.router.navigate([`/formation/edit/${id}`]);
    }
  }
  decrementPlaces(formationId: number): void {
    if (this.formation) {
      const newPlaces = this.formation.nombrePlace - 1;
  
      if (newPlaces >= 0) {
        this.formationService.updateFormationPlaces(formationId, newPlaces).subscribe(
          (updatedFormation) => {
            console.log('Formation updated:', updatedFormation);
            this.formation = updatedFormation;  // Update the local formation data
          },
          (error) => {
            console.error('Error updating formation places:', error);
          }
        );
      } else {
        console.error('No places available for decrement');
      }
    } else {
      console.error('Formation details are not available');
    }
  }
  onCancel(): void {
    this.router.navigate(['/formation']);
  }

  deleteFormation(id: string | null) {
    if (id && confirm('Êtes-vous sûr de vouloir supprimer cette formation ?')) {
      const idAsNumber = +id;
      this.formationService.deleteFormation(idAsNumber).subscribe(() => {
        alert(`Formation ${id} supprimée.`);
        this.router.navigate(['/formation']);
      });
    }
  }

  async redirectToStripeCheckout(sessionId: string) {
    // Ensure that Stripe.js is loaded and ready
    const stripe = await this.stripe;

    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error('Error redirecting to Stripe Checkout:', error);
      }
    }
  }
}
