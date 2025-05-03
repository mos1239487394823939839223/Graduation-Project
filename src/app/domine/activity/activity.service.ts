import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Activity } from './models/activity';

const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private OptionsHttp;
 
  constructor(private httpClient :HttpClient)
    {
      this.OptionsHttp={
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
         
        })
        }         
}

getActivities(): Observable<Activity[]> {
  return this.httpClient.get<Activity[]>(`${API_URL}/activity`);
}

toServerModel(entity: Activity): any {
  return {
    id: entity.id,
    name: entity.name,
    decription : entity.decription,
    
  };
}

add(resource: Activity): Observable<any> {
  return this.httpClient
    .post(`${API_URL}/activity`, this.toServerModel(resource))
    .pipe(
      catchError((err) => {
        throw new Error(err.message);
      })
    );
}

delete(id: string | number): Observable<any> {
  return this.httpClient.delete(`${API_URL}/activity/${id}`).pipe(
    catchError((err) => {
      throw new Error(err.message);
    })
  );
}

update(resource: Activity): Observable<any> {
  // @ts-ignore
  return this.httpClient.put(`${API_URL}/activity/${resource.id}`, this.toServerModel(resource)).pipe(
    catchError((err) => {
      throw new Error(err.message);
    })
    );
}
}
