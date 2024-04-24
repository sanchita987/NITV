import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TaxService } from '../tax.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taxupdate',
  standalone: true,
  imports: [CommonModule,RouterModule, ReactiveFormsModule],
  templateUrl: './taxupdate.component.html',
  styleUrl: './taxupdate.component.css'
})
export class TaxupdateComponent {
  taxForm: FormGroup;
  id: number | null = null; // Initialize id as null

  constructor(
    private fb: FormBuilder,
    private taxService: TaxService,
    private route: ActivatedRoute,
    private router:Router
  ) {
    this.taxForm = this.fb.group({
      name: ['', Validators.required],
      rate: ['', [Validators.required, Validators.pattern(/^-?\d*(\.\d+)?$/)]],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      if (id) {
        this.id = id; // Assign the id received from route parameters
        this.taxService.gettax(id).subscribe((response: any) => {
          console.log('update tax', response);
          if (response && response.data) {
            this.taxForm.patchValue({
              name: response.data.name,
              rate: response.data.rate,
              description: response.data.description
            });
          }
        });
      }
    });
  }

  ontaxUpdate(): void {
    if (this.id === null) {
      console.error('ID is null.');
      return; // Exit the method if ID is null
    }
  
    const taxData = this.taxForm.value;
    this.taxService.updateTax(taxData, this.id)
      .subscribe({
        next: (response: any) => {
          console.log('Tax Update successful:', response);
          // Handle success, e.g., redirect to another page
          this.router.navigate(['admin/tax']);
        },
        error: (error: any) => {
          console.error('Error occurred during Tax update:', error);
        }
      });
  }

  get name() {
    return this.taxForm.get('name');
  }

  get rate() {
    return this.taxForm.get('rate');
  }

  get description() {
    return this.taxForm.get('description');
  }
}