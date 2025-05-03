import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { University } from 'src/app/domine/university/models/university';
import { UniversityService } from 'src/app/domine/university/university.service';
import { AddUniversityComponent } from '../../university/add-university/add-university.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FacultyService } from 'src/app/domine/faculty/faculty.service';
import { Faculty } from 'src/app/domine/faculty/models/faculty';

@Component({
  selector: 'app-add-faculty',
  templateUrl: './add-faculty.component.html',
  styleUrls: ['./add-faculty.component.scss']
})
export class AddFacultyComponent implements OnInit {

  facultyForm!: FormGroup
  faculties:Faculty[]=[];
  constructor( private snackBar: MatSnackBar,private formBuilder :FormBuilder,private facultyService : FacultyService,
  public dialog:  MatDialogRef<AddFacultyComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Faculty,) { }

  ngOnInit() {
  this.getFaculities()
    this.initForm()
  }

  initForm(){
    this.facultyForm= this.formBuilder.group({
      id:[''],
      name: ['',[Validators.required]],
      decription: ['',[Validators.required]],
      img: ['',[Validators.required]],
    })
  } 
  
  add(){
    this.facultyService.add(this.facultyForm.value).subscribe(
      () => {
        this.getFaculities();
        this.snackBar.open(('تمت الاضافة '),('اغلاق'), {
          duration: 2000,
        })
      },()=>{
       
      }
    )

   this.closeDialog()
   this.getFaculities();
  }

  restartForm(){
    this.facultyForm.reset();
  }

  closeDialog(){
    this.dialog.close(this.editData);
  }

  getFaculities(){
    this.facultyService.getFaculties().subscribe(prdList=>{
      this.faculties=prdList;
  })
  }


}
