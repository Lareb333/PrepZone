import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminApiService } from 'src/app/services/admin-api.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  constructor(private adminApi:AdminApiService,private router:Router) { }

  ngOnInit(): void {
    const token = localStorage.getItem('admintoken')
    if (token) {
      this.router.navigate(['/admin'])
    }
  }
  onSubmit(form: NgForm,f1:HTMLInputElement,f2:HTMLInputElement): void {
    this.adminApi.login(form.value).subscribe(
      (response) => {
      localStorage.setItem('admintoken', response.adminToken)
        this.router.navigate(['admin'])
      },
      (error) => {
        f1.style.border='1px solid red'
        f2.style.border='1px solid red'
        setTimeout(()=>{
        f1.style.border=''
        f2.style.border=''
        },5000)
        console.error( error);
      }
    );
  }
  navigateHome():void{
    this.router.navigate([''])
  }

}
