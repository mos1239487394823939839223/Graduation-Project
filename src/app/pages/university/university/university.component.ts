import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { University } from 'src/app/domine/university/models/university';
import { UniversityService } from 'src/app/domine/university/university.service';
import { AddUniversityComponent } from '../add-university/add-university.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUniversityComponent } from '../edit-university/edit-university.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-university',
  templateUrl: './university.component.html',
  styleUrls: ['./university.component.scss']
})
export class UniversityComponent implements OnInit {
 univeristies : University[] = [];
 uniList : University[] = [];
 uniForm!: FormGroup
  constructor(private uniService : UniversityService,
    private formBuilder :FormBuilder,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router : Router 
    ) { 
   /* this.univeristies = [
      {id : 1 , name :'Cairo University', img : '/assets/images/cairo.png' , decription : 'Firist unveristy in Egypy '},
      {id : 2 , name :'Ain Shams University', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'  },
      {id : 3 , name :'Alexendria University', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},

      {id : 4, name :'Assuit University', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},

      {id : 5, name :'Mansoura University', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},

      {id : 6, name :'Aswain University', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},

      {id : 7, name :'Al-Azhar University', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},

      {id : 8 , name :'Benha University ', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},

      {id : 9, name :'	Beni-Suef University', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},

      {id : 10, name :'	Damanhour University', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy'},

      {id : 11 , name :'	Damietta University', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},

      {id : 12, name :'Fayoum University', img : '/assets/images/active.jpg' , decription : 'Firist unveristy in Egypy .'},
    ]*/
  }

  ngOnInit() {
  this.getAllUniversities()
}

getAllUniversities(){
  this.uniService.getUniversities().subscribe(prdList=>{
    this.uniList=prdList;
})
}

initForm(){
  this.uniForm = this.formBuilder.group({
    id:[''],
    name: ['',[Validators.required]],
    decription: ['',[Validators.required]],
    img: ['',[Validators.required]],
  })
} 

adduni(){
this.dialog.open(AddUniversityComponent).afterClosed().subscribe(res =>{
  this.getAllUniversities()
  this.uniList
})
}

deleteUniversity(uni: University): void {
  this.uniService.delete(uni.id).subscribe(() => {
   this.getAllUniversities();
    this.snackBar.open(('تم المسح بنجاح'),('اغلاق'),
      {
        duration: 2000,
      }
    );
  });
}


openniversityDialog(university: University): void {
  const dialogRef = this.dialog.open(EditUniversityComponent, {
    width: '400px',
    data: university
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      // Update the university object with the edited data
      const index = this.uniList.findIndex(u => u.id === result.id);
      this.uniList[index] = result;
      this.getAllUniversities();
      this.uniList
    }
  });
}


navigate(): void {
  this.router.navigate([`faculty`]);
}
}


