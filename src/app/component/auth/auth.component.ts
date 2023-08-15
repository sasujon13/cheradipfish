import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authForm: FormGroup;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.authForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onAuth() {
    if (this.authForm.valid) {
      const email = this.authForm.value.email;
      const password = this.authForm.value.password;

      if (this.isLoginMode) {
        this.authService.login(email, password).subscribe(
          (response) => {
            // Perform any additional logic on successful login
            this.router.navigate(['/order']); // Redirect to order page
          },
          (error) => {
            console.error('Login error:', error);
          }
        );
      } else {
        // Perform signup logic
        this.authService.signup(email, password).subscribe(
          (response) => {
            // Perform any additional logic on successful signup
            this.router.navigate(['/order']); // Redirect to order page
          },
          (error) => {
            console.error('Signup error:', error);
          }
        );
      }
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }
}
