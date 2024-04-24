import { Component } from '@angular/core';
import { PaymentService } from '../payment.service';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';

@Component({
  selector: 'app-payment-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment-detail.component.html',
  styleUrl: './payment-detail.component.css'
})
export class PaymentDetailComponent {
  payments: any[] = [];
  payment: any = {
    data: []
  };
  invoices:any[] = [];
  constructor(private data: PaymentService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.data.getPaymentDetail(data['id']).subscribe((response: any) => {
        console.log(response, "response")
        this.payment= response['data'];
        this.invoices = this.payment.invoices;
      })
    })
    this.fetchPayments();
  }
  fetchPayments() {
    this.data.getpayment().subscribe({
      next: (response: any) => {
        if (response.status) {
          this.payments = response.data.items;
          console.log('Payments:', this.payments);
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
        pdf.save('Payment.pdf');
      });
    }
  }
  
}
