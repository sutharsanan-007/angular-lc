import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../service/api.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    MatButtonModule, 
    MatIconModule, 
    MatInputModule, 
    MatFormFieldModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: any;
  hide = true;
  btnInnerHtml:string = 'Sign in'
  @ViewChild('loaderBtn', { read: ElementRef, static: false }) loaderBtn!: ElementRef;
  constructor(private formBuilder: FormBuilder,private ApiService:ApiService,private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMe: [false]
    });
  }
  onSubmit() {
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid) {
      this.btnInnerHtml = '';
      this.loaderBtn.nativeElement.classList.add('loader')
      setTimeout(() => {
        this.btnInnerHtml = 'Sign in';
        this.loaderBtn.nativeElement.classList.remove('loader')
        // if credentials is correct 
        this.snackBar.open('Logged in successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.loginForm.reset();
      }, 3000);
      this.ApiService.login(this.loginForm.value).subscribe((res:any)=>{
        console.log(res)
      })
    }
  }
}
