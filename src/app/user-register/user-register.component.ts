import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { Validators } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { FormGroup } from '@angular/forms';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-user-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  
  registerForm: any
  registerResponse: any = null;
  errorResponse: any = ''
  constructor(private userserviceservice: UserService,
  private router: Router,
    private fb: FormBuilder) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['',[Validators.required, ]],
      name: ['', [Validators.required,]],
      company: ['', []],
      address: ['', []],
      user_type: ['', []],
      is_active: [false, ''],
      phone: ['', [, Validators.minLength(10)]],
    });
  }
  

  onregister(): void {
    console.log(this.registerForm.value);
    if (!this.registerForm.valid) {
      return;
    }
    const registerData = this.registerForm.value;
    this.userserviceservice.registerUser(registerData).subscribe({
      next: (response) => {
        this.registerResponse = response;
        this.router.navigate(['admin/user']);
        console.log('Register successful:', response);
        this.registerForm.reset();
      },
      error: (error) => {
        console.log(error.status);
        this.errorResponse = "Error Occurred";
      }
    });
}


  get name() {
    return this.registerForm.get('name')
  }

  get company() {
    return this.registerForm.get('company')
  }

  get email() {
    return this.registerForm.get('email')
  }

  get phone() {
    return this.registerForm.get('phone')
  }

  get is_active() {
    return this.registerForm.get('company')
  }

  get user_type() {
    return this.registerForm.get('company')
  }

  get password() {
    return this.registerForm.get('password')
  }

  get address() {
    return this.registerForm.get('address')
  }



}








