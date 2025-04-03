import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RessourceAddComponent } from './ressource-add.component';

describe('RessourceAddComponent', () => {
  let component: RessourceAddComponent;
  let fixture: ComponentFixture<RessourceAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RessourceAddComponent]
    });
    fixture = TestBed.createComponent(RessourceAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
