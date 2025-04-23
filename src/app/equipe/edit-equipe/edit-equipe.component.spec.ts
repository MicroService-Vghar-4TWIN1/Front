import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEquipeComponent } from './edit-equipe.component';

describe('EditEquipeComponent', () => {
  let component: EditEquipeComponent;
  let fixture: ComponentFixture<EditEquipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEquipeComponent]
    });
    fixture = TestBed.createComponent(EditEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
