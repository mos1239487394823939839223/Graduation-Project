import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { University } from './models/university';
import { environment } from 'src/environments/environment';


const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class UniversityService {
  private OptionsHttp;
 
  constructor(private httpClient :HttpClient)
    {
      this.OptionsHttp={
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
         
        })
        }         
}

getUniversities(): Observable<University[]> {
  return this.httpClient.get<University[]>(`${API_URL}/university`);
}

toServerModel(entity: University): any {
  return {
    id: entity.id,
    name: entity.name,
    img: entity.img,
    decription : entity.decription,
    
  };
}

add(resource: University): Observable<any> {
  return this.httpClient
    .post(`${API_URL}/university`, this.toServerModel(resource))
    .pipe(
      catchError((err) => {
        throw new Error(err.message);
      })
    );
}

delete(id: string | number): Observable<any> {
  return this.httpClient.delete(`${API_URL}/university/${id}`).pipe(
    catchError((err) => {
      throw new Error(err.message);
    })
  );
}

update(resource: University): Observable<any> {
  // @ts-ignore
  return this.httpClient.put(`${API_URL}/university/${resource.id}`, this.toServerModel(resource)).pipe(
    catchError((err) => {
      throw new Error(err.message);
    })
    );
}

}

