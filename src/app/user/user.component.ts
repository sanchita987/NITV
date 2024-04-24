import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../user.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ RouterModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  sortColumn = 'created_at';
  reverseSort = false;
  currentPage: number = 1;
  totalPages: number = 50;
  loading: boolean = true;
  per_page : number = 25
  user: any = {
    data: []
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.userService.getuser(
      this.currentPage,
      this.sortColumn, 'desc',
    this.per_page)
      .subscribe({
        next: (response: any) => {
          this.loading = false;
          console.log(response);
          this.user = response['data'];
          this.user = response.data;
          this.totalPages = response.total_pages;
          this.totalPages = Math.min(response.total_pages, 10);
        },
        error: (error) => {
          if (error.status === 404) {
            console.error('User not found. Redirect or show a message.');
          } else {
            console.error('An error occurred:', error);
          }
        }
      });
  }
  loadNextPage() {
    if (this.currentPage >= 4) {
      alert('No more next pages found');
      return;
    }
    this.currentPage++;
    this.loadUser();
    console.log('Current Page:', this.currentPage);
    console.log('Total Pages:', this.totalPages);
  }

  loadPreviousPage() {
    if (this.currentPage === 1) {
      alert("No previous page found");
      return;
    }
    this.currentPage--;
    this.loadUser();
  }

  getPageNumbers(): number[] {
    const totalPagesArray = [];
    for (let i = 1; i <= 4; i++) {
      totalPagesArray.push(i);
    }
    return totalPagesArray;
  }

  loadPage(page: number) {
    this.currentPage = page;
    this.loadUser();
  }
//   loadper_Page(per_page: number) {
// per_page= 30;
// per_page=25;
//     this.loadUser();
//   }
} 