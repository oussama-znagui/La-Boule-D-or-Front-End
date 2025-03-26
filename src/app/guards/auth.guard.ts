import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<boolean> => {
  const router = inject(Router);


  
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  
  if (!token) {
   
    router.navigate(['/']);
    return of(false);
  }

  const expectedRole = route.data['role'];

  if (expectedRole) {
    console.log(role + expectedRole);
    if (role == expectedRole) {
      
      return of(true);
    } else {
      router.navigate(['/']);
      return of(false); 
    }
  }

  return of(true);
};
