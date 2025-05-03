import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';





@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
  
],
exports: [
  CommonModule,
  AngularMaterialModule,
  ReactiveFormsModule
],
})
export class SharedModule { }
