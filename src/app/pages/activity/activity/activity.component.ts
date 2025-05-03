import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivityService } from 'src/app/domine/activity/activity.service';
import { Activity } from 'src/app/domine/activity/models/activity';
import { ConfirmDialogComponent } from 'src/app/shared/components/confirm-dialog/confirm-dialog.component';
import { RegisterComponent } from '../../register/register.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {
 activities : Activity[] =[]
  activityForm!: FormGroup;
  currentActivity!: Activity;
  searchText!: string;
  dataSource!: MatTableDataSource<Activity>;
  @ViewChild(MatSort) sort!: MatSort 
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'register',
    'update',
    'delete'
  ];
  constructor( private formBuilder :FormBuilder,private activityService:ActivityService,private snackBar : MatSnackBar,
  private  dialog : MatDialog) { }

  ngOnInit(): void {
    this.getAllActivities();
    this.initForm()
  }

  initForm() {
    this.activityForm = this.formBuilder.group({
      id: [''],
      name: ['', [Validators.required]],
      decription: ['', [Validators.required]],
    });
  }
  fetchData(activity: Activity): void {
    this.activityForm.patchValue(activity);
    this.currentActivity = activity;
  }
  getAllActivities(): void {
    this.activityService.getActivities().subscribe(prdList=>{
      this.activities=prdList;
      this.dataSource = new MatTableDataSource (this.activities)
      this.dataSource.sort=this.sort
      this.dataSource.filterPredicate = 
      (data: Activity, filtersJson: string) => {
          const matchFilter:any[] = [];
          const filters = JSON.parse(filtersJson);
          filters.forEach(filter => {
            data[filter.id] = data.name;
            const val = data[filter.id] === null ? '' : data[filter.id];
            matchFilter.push(val.toLowerCase().includes(filter.value.toLowerCase()));
          });
            return matchFilter.every(Boolean);
        };
    });

    
  }

  applyFilter(filterValue: string) {
    const tableFilters :any []= [];
    tableFilters.push({
      id:'',
      value: filterValue
    });
    this.dataSource.filter = JSON.stringify(tableFilters);
  }

  onSubmit() {
    this.activityForm.markAllAsTouched();
    if (this.activityForm.valid) {
      this.activityForm.controls['id'].value
        ? this.updateActivity()
        : this.add();
       this.activityForm.reset();
    } 
  }

  add(){
    this.activityService.add(this.activityForm.value).subscribe(
      () => {
        this.getAllActivities()
        this.snackBar.open(('تمت الاضافة '),('اغلاق'), {
          duration: 2000,
        })
      },()=>{
       
      }
    )
    }
  updateActivity(): void {
  
    this.activityService.update(this.activityForm.value).subscribe(
      () => {
         this.getAllActivities()
       
        this.snackBar.open(('تم التعديل بنجاح'),('اغلاق') ,
          {
            duration: 2000,
          }
        );
      },
      () => {
        
      }
    );
  }

  resetForm(): void {
    this.activityForm.controls['id'].value
      ? this.fetchData(this.currentActivity)
      : this.clearTheForm();
  }
  
 deldeteActivity(activity : Activity) {
    this.activityService.delete(activity.id).subscribe(() => {
      this.getAllActivities()
       this.snackBar.open(('تم المسح بنجاح'),('اغلاق'),
         {
           duration: 2000,
         }
       );
     });
  }

  openConfirmationDialog(active: Activity) {
    let dialogRef = this.dialog.open(ConfirmDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'yes') {
        this.deldeteActivity(active);
      }
    });
  }


  clearTheForm(): void {
    this.activityForm.reset();
  }

  restartForm(): void {
    this.clearTheForm();
  }

 register(){
  const dialogRef = this.dialog.open(RegisterComponent, {
    width: '700px',
    height: '700px'
 
  });
   
    }


}
