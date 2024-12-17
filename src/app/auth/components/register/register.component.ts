import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {}

  funRegistrar() {
    if (this.registerForm.valid) {
      const formValues = this.registerForm.value;

      if (formValues.password !== formValues.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }

      const { name, email, password } = formValues;

      this.authService.registroConNest({ name, email, password }).subscribe(
        (res) => {
          console.log('Usuario registrado exitosamente:', res);
          this.router.navigate(['/auth/login']); 
        },
        (error) => {
          console.error('Error al registrar el usuario:', error);
        }
      );
    }
  }
}
