import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Club } from '../models/club';
import { catchError, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClubService {

 
    private apiUrl=  "http://localhost:8080/clubs";

  constructor(private http: HttpClient) { }


  getAllClubs(): Observable<Club[]>{
    return this.http.get<Club[]>(this.apiUrl+ "/all").pipe(
      catchError(error => {
        console.error("Erreur lors de la récupération des Club",error);
          return of([] as Club[])
      })
    )

  }
  
}
