import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})

export class AdminComponent {
  isHovered: boolean = false;
  isNavbarCollapsed: boolean = false;
  isNavbarExpanded: boolean = false;
  isTextGrown: boolean = true;
  isDropdownOpen2: boolean = false;
  isDropdownOpen: boolean = false;
  isDropdownOpen3: boolean = false;
  constructor(private router: Router) {}
 
  testClick() {
    console.log('Test function called');
  }
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
    this.isNavbarExpanded = !this.isNavbarExpanded;
    console.log('Navbar collapsed state:', this.isNavbarCollapsed);
  }
  logout() {
    localStorage.removeItem('access_token');
    this.router.navigate(['login'])
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    console.log('isDropdownOpen:', this.isDropdownOpen);
  }
  toggleDropdown2() {
    this.isDropdownOpen2 = !this.isDropdownOpen2;
  }
  toggleDropdown3() {
    this.isDropdownOpen3 = !this.isDropdownOpen3;
    console.log('isDropdownOpen3:', this.isDropdownOpen3);
  }


  
}
