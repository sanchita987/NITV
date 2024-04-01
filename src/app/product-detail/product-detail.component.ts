import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  plans: any = {};
  coupons: any = {};
  addons: any = {};
  product: any;
  products: any[] = [];
  section: any = 'plans';
  activeSection: string = 'plans';
  filter = 'all';
  constructor(private productService: ProductService,
  private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.productId = data['id'];
      this.fetchProductData(this.productId);
    });
    this.filterData(this.filter);

  }
  
  updateItemId(newItemId: string): void {
    this.productId = parseInt(newItemId, 10); 
    this.fetchProductData(this.productId);
  }
  
  fetchProductData(productId: number): void {
    this.productService.getProductById(productId.toString()).subscribe((response: any) => {
      console.log(response, "response");
      this.product = response['data'];
      this.plans = this.product.plans || [];
      this.coupons = this.product.coupons || [];
      this.addons = this.product.addons || [];
      console.log('Plans:', this.product.plans);
      console.log('Coupons:', this.product.coupons);
      console.log('Addons:', this.product.addons);
      console.log('Product:', this.product);
    });
  }

filterData(filterValue: string): void {
    console.log('Filter:', filterValue);
    this.filter = filterValue;
    this.loadProducts(this.filter);
}

loadProducts(filter: string): void {
    this.productService.getProducts(filter).subscribe({
        next: (response: any) => {
            this.products = response.data.items;
            console.log('Products:', this.products);
        },
        error: (error: any) => {
            console.error('Error loading products:', error);
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
}