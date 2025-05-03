import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { User } from 'src/app/domine/login/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hide: boolean = true;
  loginUsers:User[]=[];
   
   constructor(private formBuilder : FormBuilder,
    private authservice :AuthService,) { 
   
  }

  ngOnInit(): void {
    this.loginmentForm();
    this.setUsers();
  }

  loginmentForm() {
    this.loginForm = this.formBuilder.group({
      email: ['' , [Validators.required]],
      password: ['' , [Validators.required]],
    });
  }

  setUsers(){
   this.authservice.storeUsers();
  }

  login(user: User)
  {
   this.authservice.logIn(user)
  }
}


