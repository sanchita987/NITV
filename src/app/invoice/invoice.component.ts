import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InvoiceServiceService } from '../invoice-service.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {
  invoice: any = {
    data: []
  };
  loading: boolean = false;

  constructor(private invoiceService: InvoiceServiceService) {}

  ngOnInit(): void {
    this.loadInvoice();
  }

  loadInvoice(): void {
    this.loading = true;
    this.invoiceService.getInvoice({})
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log(response, "response");
          this.invoice = response['data'];
        },
        error: (error) => {
          console.error('An error occurred:', error);
        }
      });
  }
}
