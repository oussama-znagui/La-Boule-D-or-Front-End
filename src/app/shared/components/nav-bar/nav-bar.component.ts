import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAuthState, selectIsAuthenticated, selectUserRole } from '../../../features/auth/store/auth.selector';

@Component({
  selector: 'app-nav-bar',
  imports: [RouterLink],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  auth!: boolean;
  role: string | null = null
  constructor(private store: Store){


  }

  ngOnInit(){
    this.store.select(selectIsAuthenticated).subscribe(data => this.auth = data)
      this.store.select(selectUserRole).subscribe(data => this.role = data)
  }

}
