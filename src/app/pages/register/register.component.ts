import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule, NgIf } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CustomValidators } from 'src/app/confirmed.alidators';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(  private fb: FormBuilder,
 
    private router: Router,private  dialog : MatDialog) { }

  ngOnInit(): void {
  }

  registerForm = this.fb.group(
    {
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      emailAdress: ['', [Validators.required, Validators.email]],
      moblieNum: [
        '',
        [Validators.required, Validators.pattern('^((\\+20-?)|0)?[0-9]{10}$')],
      ],
      gender: ['', Validators.required],
      dateOfBirth: this.fb.group({
        day: [''],
        month: [''],
        year: [''],
      }),
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validator: CustomValidators.MatchValidator('password', 'confirmPassword'),
    }
  );

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('confirmPassword')?.touched
    );
  }
  get registerFormControl() {
    return this.registerForm.controls;
  }
  dayList: number[] = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
    22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
  ];
  monthList: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  yearList: number[] = [
    1990, 1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000, 2001,
    2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013,
    2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023,
  ];
  onSubmit() {
    console.log(this.registerForm.value);
    const user = this.registerForm.value;
  
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Register successfully',
        showConfirmButton: false,
        timer: 1500,
      });
      this.router.navigate(['/activity']);
      window.scrollTo(0, 0);
  this.close()

}

close(){
  this.dialog.closeAll()
}
}
