import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { City } from '../models/city';

@Injectable({
  providedIn: 'root'
})
export class CityService {

  private apiUrl=  "http://localhost:8080/cities";

  constructor(private http: HttpClient) { }


  getAllCities(): Observable<City[]>{
    return this.http.get<City[]>(this.apiUrl).pipe(
      catchError(error => {
        console.error("Erreur lors de la récupération des villes",error);
          return of([] as City[])
      })
    )

  }
}
