import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TaxService } from '../tax.service';
import { CommonModule } from '@angular/common';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-tax',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './tax.component.html',
  styleUrls: ['./tax.component.css']
})
export class TaxComponent {
  tax: any = { data: { items: [] } };
  loading: boolean = true;

  constructor(private taxService: TaxService) {
    this.taxService.getTax()
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe({
        next: (response: any) => {
          console.log(response, "response");
          if (response && response.data && response.data.items) {
            this.tax.data.items = response.data.items;
          } else {
            console.error('Tax data is missing or in unexpected format.');
          }
        },
        error: (error) => {
          if (error.status === 404) {
            console.error('Tax not found. Redirect or show a message.');
          } else {
            console.error('An error occurred:', error);
          }
        }
      });
  }
  truncateText(text: string, maxLength: number = 20): string {
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
}
