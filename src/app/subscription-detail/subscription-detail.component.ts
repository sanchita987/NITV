import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { SubscriptionService } from '../subscription.service';
import { InvoiceServiceService } from '../invoice-service.service';
import { PaymentService } from '../payment.service';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-subscription-detail',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './subscription-detail.component.html',
  styleUrl: './subscription-detail.component.css'
})
export class SubscriptionDetailComponent {
  commentForm: any;
  subscriptions: any[] = [];
  invoices: any = [];
  charges: any = [];
  contacts: any[] = [];
  addons: any[] = [];
  totalAmount : number = 0;
  amount: number = 0;
  subscriptioncomments: any;
  plan: any = {};
  subscriber: any = {
    data: []
  };
  section: any = 'overview';
 activeSection: string = 'overview';
 subscriptionId : number=0;
  constructor(private subscriptionService: SubscriptionService,
     private route: ActivatedRoute, 
     private invoiceService : InvoiceServiceService,
     private paymentService : PaymentService,
     private fb: FormBuilder) {
      this.commentForm = this.fb.group({
        body: ['', [Validators.required]]
      });
     }

     ngOnInit(): void {
      this.route.params.subscribe(data => {
        this.subscriptionId = data['id'];
        this.subscriptionService.getSubscriptionDetail(this.subscriptionId).subscribe((response: any) => {
          console.log(response, "response");
          this.subscriber = response['data'];
          this.addons = this.subscriber.addons || []; 
          this.plan = this.subscriber.plan || []; 
          console.log('plan:', this.subscriber.plan);
          this.calculateAmount();
          this.calculateTotalAmount();

          this.subscriptionService.getExtraCharges(this.subscriptionId).subscribe((extraCharges: any) => {
            console.log('Subscription Extra Charges:', extraCharges);
            this.charges = extraCharges;
          });

          this.paymentService.getSubscriptioncomments(data['id']).subscribe((response: any) => {
            this.subscriptioncomments = response['data'];
            console.log('subscription comments:', this.subscriptioncomments);
          //used subscription_id to fetch the invoices
          this.invoiceService.getInv(this.subscriptionId).subscribe((res: any) => {
            this.invoices = res['data'];
            console.log('Invoices:', this.invoices);
          });
        });
      });
      });
      this.loadSubscriptions();
    }
    
  calculateAmount(): void {
    if (this.addons && this.addons.length > 0) {
      this.addons.forEach(addon => {
        if (addon.unit_price && addon.quantity) {
          addon.amount = addon.unit_price * addon.quantity; 
        }
      });
    }
    if (this.plan && this.plan.unit_price && this.plan.quantity) {
      this.plan.amount = this.plan.unit_price * this.plan.quantity;
    }
  }

  calculateTotalAmount(): void {
    let totalAmount = 0;
    if (this.addons && this.addons.length > 0) {
      this.addons.forEach(addon => {
        if (addon.amount) {
          totalAmount += addon.amount;
        }
      });
    }
    if (this.plan && this.plan.amount) {
      totalAmount += this.plan.amount;
    }
    this.totalAmount = totalAmount;
  }
  
  
  loadSubscriptions(): void {
    this.subscriptionService.getsubscriptions().subscribe({
      next: (response: any) => {
        this.subscriptions = response.data.items;
      },
      error: (error: any) => {
        console.error('Error loading subscriptions:', error);
      }
    });
  }
  switchSection(section: string): void {
    if (this.section === section) {
        this.section = null;
    } else {
        this.activeSection = section;
        this.section = section; 
    }
}
onSubmitComment() {
  const comment = this.commentForm.value.body;
  const subscriptionId = this.subscriptionId ;

  const commentData = {
    subscription_id: subscriptionId,
    body: comment
  };

  this.subscriptionService.postComment(commentData)
    .subscribe({
      next: () => {
        console.log('Comment posted successfully');
        this.commentForm.patchValue({ body: '' });
      },
      error: error => console.error('Error posting comment:', error)
    });
}

  
}
