import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HomePageComponent } from './home-page/home-page.component';
import { UniversityComponent } from './university/university/university.component';
import { FacultyComponent } from './faculty/faculty.component';
import { HttpClientModule } from '@angular/common/http';
import { AddUniversityComponent } from './university/add-university/add-university.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditUniversityComponent } from './university/edit-university/edit-university.component';
import { AddFacultyComponent } from './faculty/add-faculty/add-faculty.component';
import { EditFacultyComponent } from './faculty/edit-faculty/edit-faculty.component';
import { AboutUsComponent } from './about-us/about-us/about-us.component';
import { ActivityComponent } from './activity/activity/activity.component';
import { ContactComponent } from './contact/contact/contact.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { AuthModule } from '../auth/auth.module';
import { RegisterComponent } from './register/register.component';
import { ErrorMessageComponent } from './register/error-message/error-message.component';


const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'uni', component: UniversityComponent },
  { path: 'faculty', component: FacultyComponent ,canActivate: [AuthGuard] },
  { path: 'activity', component: ActivityComponent , canActivate: [AuthGuard] },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
];
@NgModule({
  declarations: [
    HomePageComponent,
    UniversityComponent,
    FacultyComponent,
    AddUniversityComponent,
    EditUniversityComponent,
    AddFacultyComponent,
    EditFacultyComponent,
    AboutUsComponent,
    ActivityComponent,
    ContactComponent,
    RegisterComponent,
    ErrorMessageComponent
  ],
  imports: [RouterModule.forChild(routes), SharedModule ,  HttpClientModule ,   ReactiveFormsModule,AuthModule],
})
export class PagesModule { }
