import { Component } from '@angular/core';
import { SideBarComponent } from "../../shared/components/side-bar/side-bar.component";
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  imports: [SideBarComponent,RouterOutlet,RouterModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {

}
