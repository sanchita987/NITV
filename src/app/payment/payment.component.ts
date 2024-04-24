import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PaymentService } from '../payment.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css'
})
export class PaymentComponent implements OnInit {
  payment: any = { data: { items: [] } };
  loading: boolean = true;
  customerId!: number;
  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadPayment();
  }
  search = ''
  searchData(e: any) {
    console.log(e.target.value)
    this.search = e.target.value;
    this.loadPayment()
  }

  filter = 'all'
  filterData(e: any) {
    console.log(e.target.value)
    this.filter = e.target.value;
    this.loadPayment()
  }
  loadPayment(): void {
    this.loading = true;
    const filter = this.filter;
    const search = this.search;
    const page = 1; 
    const sort_order = 'desc'; 
  
    this.paymentService.getPay({ 
      filter,
      search,
      page,
      sort_order
    })
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe({
      next: (response: any) => {
        console.log(response, "response");
        if (response && response.data && response.data.items) {
          this.payment = response;
        } else {
          console.error('Payment data is missing or in unexpected format.');
        }
      },
      error: (error) => {
        if (error.status === 404) {
          console.error('Payment not found. Redirect or show a message.');
        } else {
          console.error('An error occurred:', error);
        }
      }
    });
  }
}
