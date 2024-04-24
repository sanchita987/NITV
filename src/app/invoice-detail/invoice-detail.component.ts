import { Component } from '@angular/core';
import { InvoiceServiceService } from '../invoice-service.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';


@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, RouterModule,],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.css'
})
export class InvoiceDetailComponent {
  invoices: any[] = [];
  charges: any[] = [];
  payments: any[] = [];
  invoice: any = {
    data: []
  };
  constructor(private data: InvoiceServiceService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.data.getInvoices(data['id']).subscribe((response: any) => {
        console.log(response, "response")
        this.invoice = response['data'];
        this.charges = this.invoice.charges;
        this.payments = this.invoice.payments;
      })
    })
    this.fetchInvoices();
  }
  fetchInvoices() {
    this.data.getInvo(this.data).subscribe({
      next: (response: any) => {
        if (response.status) {
          this.invoices = response.data.items;
          console.log('Invoices:', this.invoices);
        } else {
          console.error('Error fetching payments:', response.message);
        }
      },
      error: (error) => {
        console.error('Error fetching payments:', error);
      }
    });
  }
  downloadPdf(): void {
    const element = document.getElementById('pdfdownload');
    if (element !== null) {
      html2canvas(element).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jspdf('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save('INVOICE.pdf');
      });
    }
  }
}


