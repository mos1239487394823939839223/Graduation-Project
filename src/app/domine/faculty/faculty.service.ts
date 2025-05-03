import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Faculty } from './models/faculty';
import { Observable, catchError } from 'rxjs';


const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class FacultyService {

  private OptionsHttp;
 
  constructor(private httpClient :HttpClient)
    {
      this.OptionsHttp={
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
         
        })
        }         
}

getFaculties(): Observable<Faculty[]> {
  return this.httpClient.get<Faculty[]>(`${API_URL}/faculty`);
}

toServerModel(entity: Faculty): any {
  return {
    id: entity.id,
    name: entity.name,
    img: entity.img,
    decription : entity.decription,
    
  };
}

add(resource: Faculty): Observable<any> {
  return this.httpClient
    .post(`${API_URL}/faculty`, this.toServerModel(resource))
    .pipe(
      catchError((err) => {
        throw new Error(err.message);
      })
    );
}

delete(id: string | number): Observable<any> {
  return this.httpClient.delete(`${API_URL}/faculty/${id}`).pipe(
    catchError((err) => {
      throw new Error(err.message);
    })
  );
}

update(resource: Faculty): Observable<any> {
  // @ts-ignore
  return this.httpClient.put(`${API_URL}/faculty/${resource.id}`, this.toServerModel(resource)).pipe(
    catchError((err) => {
      throw new Error(err.message);
    })
    );
}
}
