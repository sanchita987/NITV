import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxupdateComponent } from './taxupdate.component';

describe('TaxupdateComponent', () => {
  let component: TaxupdateComponent;
  let fixture: ComponentFixture<TaxupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaxupdateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TaxupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
