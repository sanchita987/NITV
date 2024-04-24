import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.css'
})
export class ProductDetailComponent implements OnInit {
  productId: number = 0;
  activeItemId: string = '';
  activeLinkName: string = '';
  plans: any = {};
  coupons: any = {};
  addons: any = {};
  product: any;
  products: any[] = [];
  section: any = 'plans';
  activeSection: string = 'plans';
  filter = 'all';
  constructor(private productService: ProductService, private router :Router,
  private route: ActivatedRoute,private location: Location) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(data => {
      this.productId = data['id'];
      this.fetchProductData(this.productId);
    });
    this.filterData(this.filter);
  }
  
  updateItemId(newItemId: string): void {
    this.activeItemId = newItemId;
    this.productId = parseInt(newItemId, 10); 
    this.fetchProductData(this.productId);
    // Constructed the URL manually and updated the browser's URL without causing a full page reload
    this.location.replaceState('/admin/products/' + this.productId);
  }
  fetchProductData(productId: number): void {
    this.productService.getProductById(productId.toString()).subscribe((response: any) => {
      console.log(response, "response");
      this.product = response['data'];
      this.plans = this.product.plans || [];
      this.coupons = this.product.coupons || [];
      this.addons = this.product.addons || [];
      this.activeLinkName = this.product.id;
      console.log('active id:', this.product.id);
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
