import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.email, Validators.required]),
    password: new FormControl("", Validators.required),
    rememberMe: new FormControl(false)
  });

  ngOnInit(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      const savedEmail = localStorage.getItem('savedEmail');
      const savedPassword = localStorage.getItem('savedPassword');
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
  
      if (savedEmail && savedPassword && rememberMe) {
        this.loginForm.patchValue({
          email: savedEmail,
          password: savedPassword,
          rememberMe: true
        });
      }
    }
  }
  
  funIngresar() {
    const rememberMe = this.loginForm.get('rememberMe')?.value;
  
    this.authService.loginConNest(this.loginForm.value).subscribe(
      (res) => {
        console.log(res);

        if (typeof window !== 'undefined' && window.localStorage) {
          if (rememberMe) {
            localStorage.setItem('authToken', res.token);
            localStorage.setItem('savedEmail', this.loginForm.get('email')?.value || '');
            localStorage.setItem('savedPassword', this.loginForm.get('password')?.value || '');
            localStorage.setItem('rememberMe', 'true');
          } else {
            sessionStorage.setItem('authToken', res.token);
            localStorage.removeItem('savedEmail');
            localStorage.removeItem('savedPassword');
            localStorage.setItem('rememberMe', 'false');
          }
        }
  
        this.router.navigate(["admin"]);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
