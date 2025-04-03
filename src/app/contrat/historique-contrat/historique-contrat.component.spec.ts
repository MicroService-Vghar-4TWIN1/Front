import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoriqueContratComponent } from './historique-contrat.component';

describe('HistoriqueContratComponent', () => {
  let component: HistoriqueContratComponent;
  let fixture: ComponentFixture<HistoriqueContratComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistoriqueContratComponent]
    });
    fixture = TestBed.createComponent(HistoriqueContratComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
