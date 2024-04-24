import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProductService } from '../product.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { finalize } from 'rxjs';
import { map } from 'rxjs/operators';

declare const $: any;
@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  product: any = {
    data: { items: [] }
  };
  product_id: any;
  productForm: any;
  productResponse: any = null;
  errorResponse: any = '';
  loading:boolean = true;
  currentPage: number = 1;
  totalPages: number = 50;
  sortColumn: string = 'desc';

  constructor(private data: ProductService, private productService: ProductService,
    private route: ActivatedRoute, private router: Router,
    private fb: FormBuilder
  ) {

    this.productForm = this.fb.group({
      code: ['', [Validators.required]],
      name: ['', [Validators.required]],
      status: ['true', [Validators.required]],
      description: ['',],
    });
    this.loadPorudcts()
  }
  filter = 'all'
  filterData(e: any) {
    console.log(e.target.value)
    this.filter = e.target.value;
    this.loadPorudcts()
  }

  search = ''
  searchData(e: any) {
    console.log(e.target.value)
    this.search = e.target.value;
    this.loadPorudcts()
  }
  truncateText(text: string, maxLength: number = 20): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }

  loadPorudcts() {
    this.data.getProduct(this.filter, this.search, this.currentPage, this.sortColumn)
      .pipe(
        finalize(() => this.loading = false),
        map((response: any) => {
          if (!response || !response.data || !response.data.items) {
            throw new Error('Product data is missing or in an unexpected format.');
          }
          const sortedItems = response.data.items.sort((a: any, b: any) => {
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          });
          const totalPages = Math.min(response.total_pages, 10);
          return { items: sortedItems, totalPages };
        })
      )
      .subscribe({
        next: ({ items, totalPages }: any) => {
          this.product.data.items = items;
          this.totalPages = totalPages;
        },
        error: (error) => {
          if (error.status === 404) {
            console.error('Product not found. Redirect or show a message.');
          } else {
            console.error('An error occurred:', error);
          }
        }
      });
  }
  
  
  
  loadNextPage() {
    this.currentPage++;
    if (this.currentPage >= 4) {
      alert('No more next pages found');
      return;
    }
    this.loadPorudcts();
}
  
loadPreviousPage() {
    if (this.currentPage === 1) {
      alert("No previous page found");
      return;
    }
    this.currentPage--;
    this.loadPorudcts();
  }

  getPageNumbers(): number[] {
    const totalPagesArray = [];
    for (let i = 1; i <= 3; i++) {
      totalPagesArray.push(i);
    }
    return totalPagesArray;
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.loadPorudcts();
  }


  openModal(product: any) {
    this.product_id = ''
    this.productForm.reset()
    this.productForm.patchValue({ status: 1 })
    $('#exampleModalLong').modal('show');
  }

  closeModal() {
    $('#exampleModalLong').modal('hide');
  }


  showModal(product: any): void {
    console.log('Product Data:', product);
    this.product_id = product.id
    this.productForm.patchValue(product);
    $('#exampleModalLong').modal('show');
  }


  updateProduct(): void {
    if (!this.product_id) {
      this.addProduct();
      return;
    }
    if (!this.productForm.valid) {
      return;
    }
    this.productService.updateProduct(this.product_id, this.productForm.value).subscribe({
      next: (value) => {
        $('#exampleModalLong').modal('hide');
        this.loadPorudcts()
      },
      error: (error) => {

      },
      complete: () => {

      }
    }
    );
  }

  addProduct(): void {
    if (!this.productForm.valid) {
      return;
    }
    this.productService.saveProduct(this.productForm.value).subscribe({
      next: (value) => {
        $('#exampleModalLong').modal('hide');
        this.loadPorudcts()
      },
      error: (error) => {

      },
      complete: () => {

      }
    }
    );
  }
  get code() {
    return this.productForm.get('code');
  }
  get name() {
    return this.productForm.get('name');
  }
  get status() {
    return this.productForm.get('status');
  }
  get description() {
    return this.productForm.get('description');
  }

}
