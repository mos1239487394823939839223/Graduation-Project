import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { University } from 'src/app/domine/university/models/university';
import { UniversityService } from 'src/app/domine/university/university.service';

@Component({
  selector: 'app-add-university',
  templateUrl: './add-university.component.html',
  styleUrls: ['./add-university.component.scss']
})
export class AddUniversityComponent implements OnInit {
  uniForm!: FormGroup
  uniList:University[]=[];
  constructor( private snackBar: MatSnackBar,private formBuilder :FormBuilder,private uniService : UniversityService,
  public dialog:  MatDialogRef<AddUniversityComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: University,) { }

  ngOnInit() {
  this.getUniversities()
    this.initForm()
  }

  initForm(){
    this.uniForm = this.formBuilder.group({
      id:[''],
      name: ['',[Validators.required]],
      decription: ['',[Validators.required]],
      img: ['',[Validators.required]],
    })
  } 
  
  add(){
    this.uniService.add(this.uniForm.value).subscribe(
      () => {
        this.getUniversities();
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
    this.dialog.close(this.editData);
  }

  getUniversities(){
    this.uniService.getUniversities().subscribe(prdList=>{
      this.uniList=prdList;
  })
  }



}
