import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTaxComponent } from './create-tax.component';

describe('CreateTaxComponent', () => {
  let component: CreateTaxComponent;
  let fixture: ComponentFixture<CreateTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTaxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
