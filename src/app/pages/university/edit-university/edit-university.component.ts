import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { University } from 'src/app/domine/university/models/university';
import { UniversityService } from 'src/app/domine/university/university.service';

@Component({
  selector: 'app-edit-university',
  templateUrl: './edit-university.component.html',
  styleUrls: ['./edit-university.component.scss']
})
export class EditUniversityComponent implements OnInit {

  uniForm!: FormGroup
  uniList:University[]=[];
  constructor( private snackBar: MatSnackBar,private formBuilder :FormBuilder,private uniService : UniversityService,
  public dialog:  MatDialogRef<EditUniversityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: University,) { }

  ngOnInit() {
  this.getUniversities()
    this.initForm()
  }

  initForm(){
    this.uniForm = this.formBuilder.group({
      id:[this.data.id],
      name: [this.data.name,[Validators.required]],
      decription: [this.data.decription,[Validators.required]],
      img: [this.data.img,[Validators.required]],
    })
  } 
  
  add(){
    this.uniService.add(this.uniForm.value).subscribe(
      () => {
        this.snackBar.open(('تمت الاضافة '),('اغلاق'), {
          duration: 2000,
        })
      },()=>{
       
      }
    )

   this.closeDialog()
   this.getUniversities();
  }

  restartForm(){
    this.uniForm.reset();
  }

  closeDialog(){
    this.dialog.close(this.data);
  }

  getUniversities(){
    this.uniService.getUniversities().subscribe(prdList=>{
      this.uniList=prdList;
  })
  }

  onSubmit(){
    this.dialog.close(this.data)
  }

  updateUniversity(): void {
   
    this.uniService.update(this.uniForm.value).subscribe(
      () => {
        this.getUniversities();
        this.dialog.close(EditUniversityComponent)
        
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
