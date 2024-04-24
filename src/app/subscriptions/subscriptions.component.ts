import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SubscriptionService } from '../subscription.service';
import { CommonModule } from '@angular/common';
import { PermissionServiceService } from '../permission-service.service';
import { finalize } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subscriptions',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './subscriptions.component.html',
  styleUrl: './subscriptions.component.css'
})
export class SubscriptionsComponent {
  subscription: any = {
    data: { items: [] }
  };
  loading: boolean = true;
  hasPermission: boolean = true;
  displayButton: boolean = false;
  currentPage: number = 1;
  totalPages: number = 35;
  sortColumn: string = 'desc';

  constructor(private data: SubscriptionService, private permissionService: PermissionServiceService) {
    this.getsubscription();
  }
  getsubscription() {
    this.permissionService.getPermission('subscription').subscribe({
      next: (permissions: any) => {
        if (!permissions || !permissions.data || !permissions.data.subscription || !Array.isArray(permissions.data.subscription)) {
          console.error('Invalid permissions data:', permissions);
          return;
        }
        // Defining the permission codes to check
        const permissionCodesToCheck = ['801', '802'];

        // Checking if any of the permission codes exist in permissions data
        const hasPermission = permissions.data.subscription.some((permission: any) => {
          return permissionCodesToCheck.includes(permission.code);
        });

        if (!hasPermission) {
          this.loading = false;
          console.error('You do not have permission to view subscriptions.');
          return; // Return when none of the permission codes are found
        }

        // If one of the 802 permission code is found, displaying the button
        if (hasPermission && permissionCodesToCheck.includes('802')) {
          this.displayButton = true;
        } else {
          this.displayButton = false;
        }
        // Proceeding with fetching subscriptions
        this.data.getsubscription(this.search, this.filter, this.currentPage, this.sortColumn,)
          .pipe(
            finalize(() => {
              this.loading = false;
            }),
            map((response: any) => {
              // Sort items in descending order by a specific field (e.g., created_at)
              if (response && response.data && response.data.items) {
                response.data.items.sort((a: any, b: any) => {
                  return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
                });
              }
              return response;
            })
          )
          .subscribe({
            next: (response: any) => {
              console.log(response, "response");
              if (response && response.data && response.data.items) {
                this.subscription.data.items = response.data.items;
                this.totalPages = response.total_pages;
                this.totalPages = Math.min(response.total_pages, 10);
              } else {
                console.error('Subscription data is missing or in unexpected format.');
              }
            },
            error: (error: any) => {
              if (error.status === 404) {
                console.error('Subscription not found. Redirect or show a message.');
              } else {
                console.error('An error occurred:', error);
              }
            }
          });
      },
      error: (error: any) => {
        console.error('An error occurred while checking permissions:', error);
      }
    });
  }
  search = ''
  searchData(e: any) {
    console.log(e.target.value)
    this.search = e.target.value;
    this.getsubscription()
  }

  filter = 'live'
  filterData(e: any) {
    console.log(e.target.value)
    this.filter = e.target.value;
    this.getsubscription()
  }
  loadNextPage() {
    this.currentPage++;
    if (this.currentPage >= 1) {
      alert('No more next pages found');
      return;
    }
    this.getsubscription()
    console.log('Current Page:', this.currentPage);
    console.log('Total Pages:', this.totalPages);
  }

  loadPreviousPage() {
    if (this.currentPage === 1) {
      alert("No previous page found");
      return;
    }
    this.currentPage--;
    this.getsubscription()
  }

  getPageNumbers(): number[] {
    const totalPagesArray = [];
    for (let i = 1; i <= 2; i++) {
      totalPagesArray.push(i);
    }
    return totalPagesArray;
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.getsubscription()
  }
}


