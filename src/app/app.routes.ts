import { Routes,  } from '@angular/router';
import { BooksComponent } from './books/books.component';
import { PostsComponent } from './posts/posts.component';
import { ArtistsComponent } from './artists/artists.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { PostComponent } from './post/post.component';
import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { AdminComponent } from './admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { UserComponent } from './user/user.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { CustomerRegisterComponent } from './customer-register/customer-register.component';
import { CustomerUpdateComponent } from './customer-update/customer-update.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserUpdateComponent } from './user-update/user-update.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceRegisterComponent } from './invoice-register/invoice-register.component';
import { InvoiceDetailComponent } from './invoice-detail/invoice-detail.component';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { PaymentComponent } from './payment/payment.component';
import { ProductsComponent } from './products/products.component';
import { TaxComponent } from './tax/tax.component';
import { CreatePaymentComponent } from './create-payment/create-payment.component';
import { CreateTaxComponent } from './create-tax/create-tax.component';
import { createSubscriptionComponent } from './create-subscription/create-subscription.component';
import {materialmodule} from './materials-module.service'
import { PaymentDetailComponent } from './payment-detail/payment-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SubscriptionDetailComponent } from './subscription-detail/subscription-detail.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {
        path: 'admin', 
        component: AdminComponent,
        children: [
            { path: 'dashboard', component: DashboardComponent },
           { path: 'books', component: BooksComponent },
            { path: 'news', component: PostsComponent },
            { path: 'news/:id', component: PostComponent },
            { path: 'artists', component: ArtistsComponent },
            { path: 'contact', component: ContactComponent },
            { path: 'customer', component: CustomerComponent },
            { path: 'customer/:id', component: CustomerDetailComponent },
            { path: 'customer-register', component: CustomerRegisterComponent },
            { path: 'subscriptions', component: SubscriptionsComponent },
            { path: 'subscriptions/:id', component: SubscriptionDetailComponent },
           { path: 'customer/:id/update', component: CustomerUpdateComponent },
            { path: 'user', component: UserComponent },
            { path: 'payment', component: PaymentComponent },
            { path: 'payment/:id', component: PaymentDetailComponent },
            { path: 'create-payment', component: CreatePaymentComponent},
            { path: 'create-tax', component: CreateTaxComponent},
            { path: 'create-subscription', component: createSubscriptionComponent },
            { path: 'products', component: ProductsComponent },
            { path: 'products/:id', component: ProductDetailComponent },
            { path: 'tax', component: TaxComponent },
            { path: 'user-register', component: UserRegisterComponent },
            { path: 'user/:id', component: UserDetailComponent },
            { path: 'user/:id/update', component: UserUpdateComponent },
            { path: 'invoice', component: InvoiceComponent },
            { path: 'invoice-register', component: InvoiceRegisterComponent },
            { path: 'invoice/:id', component: InvoiceDetailComponent },
            { path: 'dynamic-form', component: DynamicFormComponent},
            
           
        ],
        canActivate: [authGuard]
    },
    { path: 'registration', component: RegistrationComponent },
    { path: 'login', component: LoginComponent },
    { path: 'forgot-password', component: ForgotPasswordComponent },
    { path: '**', component: PageNotFoundComponent }

];
