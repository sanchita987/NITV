import { Component } from '@angular/core';
import { CustomerService } from '../customer.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { InvoiceServiceService } from '../invoice-service.service';
import { Router } from '@angular/router';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { PaymentService } from '../payment.service';
import { SubscriptionService } from '../subscription.service';
import { finalize } from 'rxjs';

declare const $: any;
@Component({
  selector: 'app-customer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, FormsModule],
  templateUrl: './customer-detail.component.html',
  styleUrl: './customer-detail.component.css'
})
export class CustomerDetailComponent {
  customer: any = {
    data: []
  };
  section: any = 'overview';
  activeSection: string = 'overview';
  customers: any[] = [];
  invoices: any;
  payments: any;
  subscription: any;
  Pendingpayments: any;
  Customercomments: any[] = [];
  contacts: any;
  cid: any;
  contact_id: any;
  contactForm: any;
  contactResponse: any;
  errorResponse: any;
  commentForm: any;
  loading: boolean = true;
  commentSuccessful: boolean = false;

  constructor(private customerService: CustomerService, private data: CustomerService,
    private route: ActivatedRoute, private router: Router,
    private inoviceService: InvoiceServiceService,
    private paymentService: PaymentService,
    private subscriptionService: SubscriptionService,
    private fb: FormBuilder) {
    this.contactForm = this.fb.group({

      email: ['', [Validators.required]],
      first_name: ['', [Validators.required]],
      phone: ['',],
      title: ['',],
      mobile: ['',],
      last_name: ['',]
    })
    this.commentForm = this.fb.group({
      body: ['', [Validators.required]]
    });
    this.activeSection = '';
  }

  save() {
    if (this.contact_id) {
      this.updateContact();
      return;
    }
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.customerService.getContact(this.cid, formData).subscribe(
        response => {

          console.log('Contact saved:', response);
          this.customerService.getCustomer(this.cid).subscribe((response: any) => {
            this.customer = response['data'];
          });
          this.contactResponse = null;
          this.errorResponse = null;
          $('#exampleModalLong').modal('hide');
        },
        error => {
          console.error('Error saving contact:', error);
        }
      );
    }
  }

  update(contact: any): void {
    this.contact_id = contact.id
    this.contactForm.patchValue(contact);
    $('#exampleModalLong').modal('show');
  }


  updateContact(): void {

    // this.customerService.updateContact(this.cid, this.contact_id, this.contactForm.value).subscribe(
    //   (response) => {
    //     console.log('Contact updated successfully', response);
    //     this.contactResponse = response;
    //     this.contact_id = null;
    //   // Fetching the updated customer data toreceive the latest data
    //     this.customerService.getCustomer(this.cid).subscribe((customerResponse: any) => {
    //     this.customer = customerResponse['data'];
    //   });

    //     $('#exampleModalLong').modal('hide');
    //   },
    //   (error) => {
    //     console.error('Error updating contact', error);
    //     this.errorResponse = 'Error';
    //   }
    // );
  }

  delete(contact: any) {
    let c = confirm('do you want to sure delete ?')
    if (!c) {
      return;
    }
    this.customerService.deleteContact(this.cid, contact.id).subscribe(
      (response) => {
        console.log('Contact deleted successfully', response);
        this.contactResponse = response;
        this.contact_id = null;
        $('#exampleModalLong').modal('hide');
      },
      (error) => {
        console.error('Error updating contact', error);
        this.errorResponse = 'Error';
      }
    );
  }
  ngOnInit() {
    this.route.params.subscribe(data => {
      this.cid = data['id'];

      // Fetch invoice data
      this.inoviceService.getInvoice({ customer_id: this.cid }).subscribe((res: any) => {
        this.invoices = res['data'];
        // console.log('Invoices:', this.invoices);
        //payment data
        this.paymentService.getPayments(data['id']).subscribe((response: any) => {
          this.payments = response['data'];
          // console.log('payments:', this.payments);
          //pending payments
          this.paymentService.getPendingpayments(data['id']).subscribe((response: any) => {
            this.Pendingpayments = response['data'];
            // console.log('pending payments:', this.Pendingpayments);
            //customer comments
            this.paymentService.getCustomercomments(data['id']).subscribe((response: any) => {
              this.Customercomments = response['data'];
              // console.log('customer comments:', this.Customercomments);
              //subscription 
              this.subscriptionService.getsubscriptionList(data['id']).subscribe((response: any) => {
                this.subscription = response['data'];
                // console.log('subscription:', this.subscription);
                // Fetch customer data after fetching invoices
                this.customerService.getCustomer(data['id']).subscribe((response: any) => {
                  this.customer = response['data'];
                  // console.log('Customers:', this.customer);

                  this.fetchCustomers('all');
                });
              });
            });
          });
        });
      });
    });
  }

  fetchCustomers(filter: string): void {
    this.loading = true; 

    this.data.getCusto(filter)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          if (response.status) {
            this.customers = response.data.items;
            // console.log('Customers:', this.customers);
          } else {
            console.error('Error fetching customers:', response.message);
          }
        },
        error: (error) => {
          console.error('Error fetching customers:', error);
        }
      });
  }
  filterCustomers(filter: string): void {
    this.fetchCustomers(filter);
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
    const customerId = this.cid;
    const commentData = {
      customer_id: customerId,
      body: comment
    };
  
    this.paymentService.postComment(commentData)
      .subscribe({
        next: (response: any) => {
          if (response.status === true && response.data) {
            this.Customercomments.unshift(response.data);
            // console.log('Response from postComment:', this.Customercomments);
            this.commentForm.patchValue({ body: '' });
            this.commentSuccessful = true;
            setTimeout(() => {this.commentSuccessful = false; }, 500); 
          } else {
            console.error('Error adding comment:', response.message);
          }
        },
        error: error => {
          console.error('Error posting comment:', error);
        }
      });
  }
  
  

  deleteComment(commentId: number) {
    this.paymentService.deleteComment(commentId)
      .subscribe({
        next: (response: any) => {
          if (response.status === true) {
            const index = this.Customercomments.findIndex(comment => comment.id === commentId);
            if (index !== -1) {
              this.Customercomments.splice(index, 1);
            }
          } else {
            console.error('Error deleting comment:', response.message);
          }
        },
        error: error => {
          console.error('Error deleting comment:', error);
        }
      });
  }


  get email() {
    return this.contactForm.get('email');
  }
  get first_name() {
    return this.contactForm.get('first_name');
  }
  get last_name() {
    return this.contactForm.get('last_name');
  }
  get title() {
    return this.contactForm.get('title');
  }
  get phone() {
    return this.contactForm.get('phone');
  }
  get mobile() {
    return this.contactForm.get('mobile');
  }

}

