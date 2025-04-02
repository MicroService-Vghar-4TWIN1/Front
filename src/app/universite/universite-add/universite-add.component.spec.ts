import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniversiteAddComponent } from './universite-add.component';

describe('UniversiteAddComponent', () => {
  let component: UniversiteAddComponent;
  let fixture: ComponentFixture<UniversiteAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniversiteAddComponent]
    });
    fixture = TestBed.createComponent(UniversiteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
