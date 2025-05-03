import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/domine/login/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users:User[]=[];
  loginUsers:User[]=[];

  constructor( private router:Router ,
    private _snackBar: MatSnackBar,
    )
  {
    this.users=[
      {email:"admin", password:"123"},
      {email:"dina@gmail.com", password:"555"},
      {email:"bosy@gmail.com", password:"444"},
      {email:"raghda@gmail.com", password:"666"}
    ]
  }
  setToken(): void {
    return localStorage.setItem('token', 'any value');
  }

  storeUsers()
  {
    localStorage.setItem('loginUsers', JSON.stringify(this.users));
  }

  logIn(user : User)
  {
    if (localStorage.getItem('loginUsers')) {
      this.loginUsers=JSON.parse(localStorage.getItem("loginUsers")!);

      if(this.loginUsers.find(u=>u.email==user.email))
         {
           if(this.loginUsers.find(u=>u.password==user.password))
           {
            localStorage.setItem("isLogged","Userlogged");
            this.router.navigateByUrl('/home');
           
           }
           else
           {
            this._snackBar.open(('الرقم السري غير صحيح'),('اغلاق'), {
              duration: 2000,
            });
             return;
           }
         }

         else
         {
          this._snackBar.open(('البريد الالكتروني غير صحيح'), ('اغلاق'), {
            duration: 2000,
          });
           return;
         }
    }
  }

  getToken() {
    return localStorage.getItem("isLogged")
  }

  logOut()
  {
    localStorage.removeItem("isLogged")
    this.router.navigateByUrl('/login')
  }

}
