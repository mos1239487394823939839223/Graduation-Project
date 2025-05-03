import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FacultyService } from 'src/app/domine/faculty/faculty.service';
import { Faculty } from 'src/app/domine/faculty/models/faculty';

@Component({
  selector: 'app-edit-faculty',
  templateUrl: './edit-faculty.component.html',
  styleUrls: ['./edit-faculty.component.scss']
})
export class EditFacultyComponent implements OnInit {
  facultyForm!: FormGroup
  faculties:Faculty[]=[];
  constructor( private snackBar: MatSnackBar,private formBuilder :FormBuilder,private facultyService : FacultyService,
  public dialog:  MatDialogRef<EditFacultyComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: Faculty,) { }

  ngOnInit() {
  this.getFaculities()
    this.initForm()
  }

  initForm(){
    this.facultyForm= this.formBuilder.group({
      id:[this.editData.id],
      name: [this.editData.name,[Validators.required]],
      decription: [this.editData.decription,[Validators.required]],
      img: [this.editData.img,[Validators.required]],
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

  updateFaculty(): void {
   
    this.facultyService.update(this.facultyForm.value).subscribe(
      () => {
        this.getFaculities();
        this.dialog.close(EditFacultyComponent)
        
        this.snackBar.open(('تم التعديل بنجاح'),('اغلاق'),
          {
            duration: 2000,
          }
        );
      },
      () => {
        
      }
    );
  }


}
