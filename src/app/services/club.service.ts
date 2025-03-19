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

  addClub(c: Club): Observable<Club>{
    return this.http.post<Club>(this.apiUrl,c).pipe(
      catchError(error => {
        console.error("Erreur lors de la creation du club",error);
          return of({} as Club)
      })
    )
    
  }

  deleteClub(id: number): Observable<string>{
    return this.http.delete<string>(this.apiUrl + `/${id}`).pipe(
      catchError(error => {
        console.error("Erreur lors de la suppression du club",error);
          return of(error as string)
      })

    )
    
  }
  
}
