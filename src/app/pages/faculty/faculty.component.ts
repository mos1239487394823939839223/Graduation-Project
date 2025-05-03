import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FacultyService } from 'src/app/domine/faculty/faculty.service';
import { Faculty } from 'src/app/domine/faculty/models/faculty';
import { AddFacultyComponent } from './add-faculty/add-faculty.component';
import { EditFacultyComponent } from './edit-faculty/edit-faculty.component';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-faculty',
  templateUrl: './faculty.component.html',
  styleUrls: ['./faculty.component.scss']
})
export class FacultyComponent implements OnInit {
 faculties: Faculty[] = [] ;
 facultyForm! : FormGroup
  constructor(private facultyService : FacultyService,
    private formBuilder :FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router : Router ) {
   /* this.faculties = [
      {id : 1 , name :'Faculty of Medicine', img : '/assets/images/cairo.png' ,  decription : 'Firist unveristy in Egypy .'},
      {id : 2 , name :'Faculty of Computer Science', img : '/assets/images/active.jpg' ,  decription : 'Firist unveristy in Egypy .'},
      {id : 3 , name :'Faculty of Arts', img : '/assets/images/active.jpg' ,  decription : 'Firist unveristy in Egypy .'},
      {id : 4 , name :'Faculty of Pharmacy', img : '/assets/images/active.jpg' ,  decription: 'Firist unveristy in Egypy .'},
      {id : 5 , name :'Faculty of Commerce', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},
      {id : 6 , name :'Faculty of Science', img : '/assets/images/active.jpg' ,  decription: 'Firist unveristy in Egypy .'},
      {id : 7 , name :'Faculty of Engineering', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},
      {id : 8 , name :'Faculty of Agriculture  ', img : '/assets/images/active.jpg' ,  decription : 'Firist unveristy in Egypy .'},
      {id : 9 , name :'	Faculty of Nursing ', img : '/assets/images/active.jpg' , decription: 'Firist unveristy in Egypy .'},
      {id : 10 , name :'	Faculty of Law ', img : '/assets/images/active.jpg' ,  decription : 'Firist unveristy in Egypy .'},
      {id : 11 , name :'	Faculty of Education', img : '/assets/images/active.jpg' ,  decription: 'Firist unveristy in Egypy .'},
      {id : 12 , name :'Faculty of Education', img : '/assets/images/active.jpg' ,  decription: 'Firist unveristy in Egypy .'},
    ]*/
  }
   

  ngOnInit() {
    this.getAllgetFaculties()
  }
  
  getAllgetFaculties(){
    this.facultyService.getFaculties().subscribe(prdList=>{
      this.faculties=prdList;
  })
  }
  
  initForm(){
    this.facultyForm = this.formBuilder.group({
      id:[''],
      name: ['',[Validators.required]],
      decription: ['',[Validators.required]],
      img: ['',[Validators.required]],
    })
  } 
  
  add(){
  this.dialog.open(AddFacultyComponent).afterClosed().subscribe(res =>{
    this.getAllgetFaculties()
    this.faculties
  })
  }
  
  deleteFaculty(faculty: Faculty): void {
    this.facultyService.delete(faculty.id).subscribe(() => {
     this.getAllgetFaculties();
      this.snackBar.open(('تم المسح بنجاح'),('اغلاق'),
        {
          duration: 2000,
        }
      );
    });
  }

  openConfirmationDialog(faculty: Faculty) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.deleteFaculty(faculty);
      }
    });
  }
  
  
  openFacultyDialog(university: Faculty): void {
    const dialogRef = this.dialog.open(EditFacultyComponent, {
      data: university
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the university object with the edited data
        const index = this.faculties.findIndex(u => u.id === result.id);
        this.faculties[index] = result;
        this.getAllgetFaculties();
        this.faculties
      }
    });
  }
  
  
  navigate(): void {
    this.router.navigate([`activity`]);
  }

}
